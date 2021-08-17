import numpy as np;
import cv2 as cv;
import pandas as pd;
import pydicom as dicom;
from sys import argv;
from matplotlib import pyplot as plt;
import pydicom as dicom;
from skimage.filters import roberts, sobel, scharr, prewitt
from skimage.filters.rank import entropy
from skimage.morphology import disk
from scipy import ndimage as nd
from matplotlib import pyplot as plt
import re;

file = argv[1];
outFolderPath = argv[2];
pattern = '.*\/([\w-]+)(.dcm)';
filename = re.findall(pattern, file)[0][0];

ds = dicom.dcmread(file);

diData = ds.pixel_array;
patientId = ds.PatientID;
pixelArea = ds.PixelSpacing[0] * ds.PixelSpacing[1];

if hasattr(ds, 'RescaleSlope') and hasattr(ds, 'RescaleIntercept'):
	slope = float(ds.RescaleSlope);
	intercept = float(ds.RescaleIntercept);
	diData = intercept + ds.pixel_array * slope;

plt.imsave(f"{outFolderPath}/org-{filename}.png", diData, cmap='gray', vmin=0, vmax=200);

img = cv.imread(f"{outFolderPath}/org-{filename}.png", cv.IMREAD_GRAYSCALE);

df = pd.DataFrame()
pixelData = img.reshape(-1)
df["originalValue"] = pixelData;
df["dicomValue"] = ds.pixel_array.reshape(-1);
df["gaussian5"] = (nd.gaussian_filter(img, sigma=5).reshape(-1));
df["gaussian3"] = (nd.gaussian_filter(img, sigma=3).reshape(-1));
df["medians3"] = (nd.median_filter(img, size=3).reshape(-1));
df["medians5"] = (nd.median_filter(img, size=5).reshape(-1));
df["sobel"] = (sobel(img).reshape(-1));
df["entropy3"] = (entropy(img, disk(3)).reshape(-1));
df["clahe"] = (cv.createCLAHE(clipLimit=2.0,tileGridSize=(8,8)).apply(img).reshape(-1));
df["globalEqualized"] = (cv.equalizeHist(img).reshape(-1));

num = 1;
for theta in range(2):   #Define number of thetas
	theta = theta / 4. * np.pi
	for sigma in (1, 3, 5):  #Sigma with 1, 3 and 5
		for lamda in np.arange(0, np.pi, np.pi / 4):   #Range of wavelengths
			for gamma in (0.05, 0.5):   #Gamma values of 0.05 and 0.5
					if num not in (14, 12, 1, 2, 20, 19, 18, 9, 10, 11, 26, 22, 13, 25, 17, 33, 34, 42 , 41, 21):
						gabor_label = 'gabor' + str(num)  #Label Gabor columns as Gabor1, Gabor2, etc.
						ksize=5
						kernel = cv.getGaborKernel((ksize, ksize), sigma, theta, lamda, gamma, 0, ktype=cv.CV_32F)
						fimg = cv.filter2D(pixelData, cv.CV_8UC3, kernel)
						filtered_img = fimg.reshape(-1)
						df[gabor_label] = filtered_img
					num += 1


	
df.to_csv(f"{outFolderPath}/{filename}.csv", index=False);

print('{' + f"\"pixelArea\":{pixelArea},\"dicomPatientId\": \"{patientId}\", \"originalImagePath\": \"org-{filename}.png\", \"attributesCsvPath\":\"{filename}.csv\", \"rows\":{img.shape[0]}, \"cols\":{img.shape[1]}" + '}');