import numpy as np;
import cv2;
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

di = dicom.dcmread(file);

diData = di.pixel_array;
patientId = di.PatientID;
pixelArea = di.PixelSpacing[0] * di.PixelSpacing[1];

if hasattr(di, 'RescaleSlope') and hasattr(di, 'RescaleIntercept'):
	slope = float(di.RescaleSlope);
	intercept = float(di.RescaleIntercept);
	diData = intercept + di.pixel_array * slope;

plt.imsave(f"{outFolderPath}/org-{filename}.png", diData, cmap='gray', vmin=0, vmax=200);

img = cv2.imread(f"{outFolderPath}/org-{filename}.png");
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#Save original image pixels into a data frame. This is our Feature #1.
df = pd.DataFrame()

img2 = img.reshape(-1);
df['originalImage'] = img2;
df['originalPixelValue'] = diData.reshape(-1);

#Generate Gabor features
num = 1  #To count numbers up in order to give Gabor features a lable in the data frame
kernels = []
for theta in range(2):   #Define number of thetas
	theta = theta / 4. * np.pi
	for sigma in (1, 3, 5):  #Sigma with 1, 3 and 5
		for lamda in np.arange(0, np.pi, np.pi / 4):   #Range of wavelengths
			for gamma in (0.05, 0.5):   #Gamma values of 0.05 and 0.5
					if num not in (14, 12, 1, 2, 20, 19, 18, 9, 10, 11, 26, 22, 13, 25, 17, 33, 34, 42 , 41, 21):
						gabor_label = 'gabor' + str(num)  #Label Gabor columns as Gabor1, Gabor2, etc.
						ksize=5
						kernel = cv2.getGaborKernel((ksize, ksize), sigma, theta, lamda, gamma, 0, ktype=cv2.CV_32F)    
						kernels.append(kernel)
						#Now filter the image and add values to a new column 
						fimg = cv2.filter2D(img2, cv2.CV_8UC3, kernel)
						filtered_img = fimg.reshape(-1)
						df[gabor_label] = filtered_img  #Labels columns as Gabor1, Gabor2, etc.
					num += 1  #Increment for gabor column label


#Gerate OTHER FEATURES and add them to the data frame
							
#CANNY EDGE
edges = cv2.Canny(img, 0,200)   #Image, min and max values
edges1 = edges.reshape(-1)
df['cannyEdge'] = edges1 #Add column to original dataframe

#ROBERTS EDGE
edge_roberts = roberts(img)
edge_roberts1 = edge_roberts.reshape(-1)
df['roberts'] = edge_roberts1

#SOBEL
edge_sobel = sobel(img)
edge_sobel1 = edge_sobel.reshape(-1)
df['sobel'] = edge_sobel1

#ENTROPY with sigma=3
entrophy_img = entropy(img, disk(3))
df['entropy'] = entrophy_img.reshape(-1)

#GAUSSIAN with sigma=1
gaussian_img = nd.gaussian_filter(img, sigma=1)
gaussian_img1 = gaussian_img.reshape(-1)
df['gaussianS1'] = gaussian_img1

#GAUSSIAN with sigma=3
gaussian_img = nd.gaussian_filter(img, sigma=3)
gaussian_img1 = gaussian_img.reshape(-1)
df['gaussianS3'] = gaussian_img1

#GAUSSIAN with sigma=5
gaussian_img = nd.gaussian_filter(img, sigma=5)
gaussian_img1 = gaussian_img.reshape(-1)
df['gaussianS5'] = gaussian_img1

#GAUSSIAN with sigma=7
gaussian_img = nd.gaussian_filter(img, sigma=7)
gaussian_img1 = gaussian_img.reshape(-1)
df['gaussianS7'] = gaussian_img1

#MEDIAN with sigma=3
median_img = nd.median_filter(img, size=3)
median_img1 = median_img.reshape(-1)
df['medianS3'] = median_img1

#MEDIAN with sigma=5
median_img = nd.median_filter(img, size=5)
median_img1 = median_img.reshape(-1)
df['medianS5'] = median_img1

#VARIANCE with size=3
variance_img = nd.generic_filter(img, np.var, size=3)
variance_img1 = variance_img.reshape(-1)
df['varianceS3'] = variance_img1  #Add column to original dataframe

df.to_csv(f"{outFolderPath}/{filename}.csv", index=False);

print('{' + f"\"pixelArea\":{pixelArea},\"dicomPatientId\": \"{patientId}\", \"originalImagePath\": \"org-{filename}.png\", \"attributesCsvPath\":\"{filename}.csv\", \"rows\":{img.shape[0]}, \"cols\":{img.shape[1]}" + '}');