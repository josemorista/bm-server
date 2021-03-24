from sys import argv;
import numpy as np;
import cv2;

def execute(imgPath, outFilePath, clusters, thresholdCluster=6):
	img = cv2.imread(imgPath);
	Z = img.reshape((-1,3));

	# convert to np.float32
	Z = np.float32(Z)

	# define criteria, number of clusters(K) and apply kmeans()
	criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
	K = clusters

	ret,label,center=cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)

	# Now convert back into uint8, and make original image
	center = np.uint8(center);
	labels = label.flatten();
	res = center[labels];
	

	res[labels <= thresholdCluster] = [0,0,0];
	
	res = res.reshape((img.shape));
	
	cv2.imwrite(outFilePath, res);

execute(argv[1], argv[2], int(argv[3]), int(argv[4]));
