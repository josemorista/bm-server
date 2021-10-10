import numpy as np;
import cv2 as cv;
import pickle;
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

pca = pickle.load(open(argv[3] + "/pca", 'rb'));
scaler = pickle.load(open(argv[3] + "/scaler", 'rb'))

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
df["position"] = range(0, len(pixelData));
df["dicomValue"] = ds.pixel_array.reshape(-1);
df["gaussian7"] = (nd.gaussian_filter(img, sigma=7).reshape(-1));
df["gaussian5"] = (nd.gaussian_filter(img, sigma=5).reshape(-1));
df["gaussian3"] = (nd.gaussian_filter(img, sigma=3).reshape(-1));
df["medians5"] = (nd.median_filter(img, size=3).reshape(-1));
df["medians3"] = (nd.median_filter(img, size=3).reshape(-1));
variance_img = nd.generic_filter(img, np.var, size=3);
df['variances3'] = variance_img.reshape(-1);
df["sobel"] = (sobel(img)).reshape(-1);
df["roberts"] = (roberts(img)).reshape(-1);
df["entropy3"] = (entropy(img, disk(3))).reshape(-1);
df["clahe"] = (cv.createCLAHE(clipLimit=2.0,tileGridSize=(8,8)).apply(img).reshape(-1));
ret, thresh1 = cv.threshold(img, 0, 255, cv.THRESH_BINARY + 
																					cv.THRESH_OTSU)
df["otsu"] = thresh1.reshape(-1);


num = 1;
lamda = np.pi/4;
for t in (0, 1, 2):
	for sigma in (1, 5):
		for gamma in (0.01, 1):
			for phi in (0, 1):
				for ksize in (3, 7):
					gabor_label = 'gabor' + str(t) + str(sigma) + str(gamma) + str(phi) + str(ksize);
					theta = t*(np.pi/4);
					kernel = cv.getGaborKernel((ksize, ksize), sigma, theta, lamda, gamma, phi, ktype=cv.CV_32F);
					fimg = cv.filter2D(img, cv.CV_8UC3, kernel);
					df[gabor_label] = fimg.reshape(-1);
					num +=1;




df = scaler.transform(df);
df = pca.transform(df);
df = pd.DataFrame(df);
df.to_csv(f"{outFolderPath}/{filename}.csv", index=False);

print('{' + f"\"pixelArea\":{pixelArea},\"dicomPatientId\": \"{patientId}\", \"originalImagePath\": \"org-{filename}.png\", \"attributesCsvPath\":\"{filename}.csv\", \"rows\":{img.shape[0]}, \"cols\":{img.shape[1]}" + '}');