import numpy as np
import cv2 as cv
import json
from math import sqrt, pow

def execute(src, out, minArea=5):
    img = cv.imread(src, 0)
		# External tree or external as param
    contours, hierarchy = cv.findContours(img, cv.RETR_EXTERNAL,  cv.CHAIN_APPROX_NONE)
    # Sort by larger areas
    contoursFeatures = []
    cnts = sorted(contours, key=cv.contourArea, reverse=True)
    for i in range(0, len(cnts)):
        if cv.contourArea(cnts[i]) >= minArea:
            features = {}
            M = cv.moments(cnts[i])
            centroid = (int(M['m10'] / M['m00']), int(M['m01'] / M['m00']))
            features['xCentroid'] = centroid[0]
            features['yCentroid'] = centroid[1]
            features['arcLength'] = cv.arcLength(cnts[i], True)
            features['area'] = cv.contourArea(cnts[i])
            try:
                # Calculate eccentricity
                (x, y), (MA, ma), angle = cv.fitEllipse(cnts[i])
                a = ma/2
                b = MA/2

                if (a > b):
                    eccentricity = sqrt(pow(a, 2)-pow(b, 2))
                    eccentricity = round(eccentricity/a, 2)
                else:
                    eccentricity = sqrt(pow(b, 2)-pow(a, 2))
                    eccentricity = round(eccentricity/b, 2)

                features['eccentricity'] = eccentricity
            except Error:
                print(Error)
                features['eccentricity'] = 0
            contoursFeatures.append(features)
    f = open(out, 'w')
    f.write(json.dumps(contoursFeatures))

execute(sys.argv[1], sys.argv[2], int(sys.argv[3]))