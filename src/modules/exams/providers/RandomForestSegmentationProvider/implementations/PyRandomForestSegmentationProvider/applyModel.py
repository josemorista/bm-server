import pickle;
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

file = argv[1];
outFolderPath = argv[2];
filename = file.split('.dcm')[0];

di = dicom.dcmread(file);

diData = di.pixel_array;
patientId = di.PatientID;
pixelArea = di.PixelSpacing[0] * di.PixelSpacing[1];;

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
	for sigma in (1, 3):  #Sigma with 1 and 3
		for lamda in np.arange(0, np.pi, np.pi / 4):   #Range of wavelengths
			for gamma in (0.05, 0.5):   #Gamma values of 0.05 and 0.5
					gabor_label = 'gabor' + str(num)  #Label Gabor columns as Gabor1, Gabor2, etc.
					ksize=9
					kernel = cv2.getGaborKernel((ksize, ksize), sigma, theta, lamda, gamma, 0, ktype=cv2.CV_32F)    
					kernels.append(kernel)
					#Now filter the image and add values to a new column 
					fimg = cv2.filter2D(img2, cv2.CV_8UC3, kernel)
					filtered_img = fimg.reshape(-1)
					df[gabor_label] = filtered_img  #Labels columns as Gabor1, Gabor2, etc.
					num += 1  #Increment for gabor column label
					
########################################
#Gerate OTHER FEATURES and add them to the data frame
							
#CANNY EDGE
edges = cv2.Canny(img, 100,200)   #Image, min and max values
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

#SCHARR
edge_scharr = scharr(img)
edge_scharr1 = edge_scharr.reshape(-1)
df['scharr'] = edge_scharr1

#PREWITT
edge_prewitt = prewitt(img)
edge_prewitt1 = edge_prewitt.reshape(-1)
df['prewitt'] = edge_prewitt1

#ENTROPHY with sigma=3
entrophy_img = entropy(img, disk(3))
df['entrophy'] = entrophy_img.reshape(-1)

#GAUSSIAN with sigma=3
gaussian_img = nd.gaussian_filter(img, sigma=3)
gaussian_img1 = gaussian_img.reshape(-1)
df['gaussianS3'] = gaussian_img1

#GAUSSIAN with sigma=7
gaussian_img2 = nd.gaussian_filter(img, sigma=7)
gaussian_img3 = gaussian_img2.reshape(-1)
df['gaussianS7'] = gaussian_img3

#MEDIAN with sigma=3
median_img = nd.median_filter(img, size=3)
median_img1 = median_img.reshape(-1)
df['medianS3'] = median_img1

#VARIANCE with size=3
variance_img = nd.generic_filter(img, np.var, size=3)
variance_img1 = variance_img.reshape(-1)
df['varianceS3'] = variance_img1  #Add column to original dataframe

loaded_model = pickle.load(open("./rfModel", 'rb'))
result = loaded_model.predict_proba(df)

segmented = np.zeros(img.shape);

probThreshold = Number(argv[3]);

for i in range(0, 1024):
	for j in range(0, 256):
		if (result[i+j + (i*255)][1] > probThreshold):
			segmented[i][j] = 1;


plt.imshow(segmented, cmap='gray')
plt.imsave(f"{outFolderPath}/seg-{filename}.png", segmented, cmap='gray')

print(
	'{' + f"\"pixelArea\":{pixelArea},
	 \"dicomPatientId\": \"{patientId}\", \"originalImagePath\": \"{outFolderPath}/org-{filename}.png\", 
	 \"resultImagePath\":\"{outFolderPath}/seg-{filename}.png\"" + '}');