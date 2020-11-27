import pydicom as dicom
import numpy as np
import sys
import cv2
import imutils


def linearTransform(x, minimum, maximum, a, b):
    return ((b - a) * ((x - minimum) / (maximum - minimum)) + a)


def getSegmentedPixelColor(value, minimum, maximum):
    if value >= minimum and value <= maximum:
        return linearTransform(value, 0, 255, minimum, maximum)
    return 0


def getSegmentedBGR(pixelArray, rows, cols, minimum, maximum):
    image = np.zeros((rows, cols, 3), np.uint8)
    for i in range(rows):
        for j in range(cols):
            image[i][j][0] = image[i][j][1] = image[i][j][2] = getSegmentedPixelColor(
                pixelArray[i][j], minimum, maximum)
    return image


src = sys.argv[1]
minimum = int(sys.argv[2])
maximum = int(sys.argv[3])
output = sys.argv[4]
ds = dicom.dcmread(src)

rows = ds.Rows
cols = ds.Columns

patientId = ds.PatientID
im = getSegmentedBGR(ds.pixel_array, rows, cols, minimum, maximum)

cv2.imwrite(output, im)
