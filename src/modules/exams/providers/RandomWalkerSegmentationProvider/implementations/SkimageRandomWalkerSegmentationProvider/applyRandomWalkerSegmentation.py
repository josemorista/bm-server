from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;
from skimage.segmentation import random_walker;
import numpy as np;

def execute(imgPath, outFilePath, boneMarker, metMarker, beta=10):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	
	markers = np.zeros(img.shape, dtype=np.uint);

	markers[(img < boneMarker)] = 1;
	markers[(img > boneMarker) & (img < metMarker)] = 2;
	markers[(img >= metMarker)] = 3;

	labels = random_walker(img, markers, beta=beta, mode='bf');
	
	met = (labels == 3);

	segmented = np.zeros(img.shape, dtype=np.float);
	segmented[met] = img[met];
	plt.imsave(outFilePath, segmented, cmap='gray');

execute(argv[1], argv[2], float(argv[3]), float(argv[4]), int(argv[5]));
