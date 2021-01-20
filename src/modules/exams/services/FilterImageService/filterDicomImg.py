import numpy as np
import cv2 as cv

def execute(src, out, operation, kernelParam=2):
    img = cv.imread(src, 0)

    if operation is 'erode':
        kernelSize = int(kernelParam)
        kernel = np.ones((kernelSize,kernelSize),np.uint8)
        img = cv.erode(img, kernel, iterations=1)

    if operation is 'dilate':
        kernelSize = int(kernelParam)
        kernel = np.ones((kernelSize,kernelSize),np.uint8)
        img = cv.dilate(img,kernel,iterations = 1)

    cv.imwrite(out, img)


execute(argv[1], argv[2], argv[3], argv[4])