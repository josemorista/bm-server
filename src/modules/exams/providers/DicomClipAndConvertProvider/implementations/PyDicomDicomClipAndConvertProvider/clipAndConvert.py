from sys import argv
import pydicom as dicom;
from skimage import img_as_float;
from matplotlib import pyplot as plt;

def execute(imgPath, outFilePath, maxDicomValue):
	ds = dicom.dcmread(imgPath);
	#pixelArea = ds.PixelSpacing[0] * ds.PixelSpacing[1];
	#rows = ds.Rows;
	#cols = ds.Columns;
	#patientId = ds.PatientID;
	pixelArray = ds.pixel_array.clip(0, maxDicomValue);
	pixelArray = img_as_float(pixelArray / pixelArray.max());
	plt.imsave(outFilePath, pixelArray, cmap='gray');

execute(argv[1], argv[2], int(argv[3]));
