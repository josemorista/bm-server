from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;
from skimage.filters import threshold_multiotsu;
import numpy as np;

def execute(imgPath, outFilePath):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	thresholds = threshold_multiotsu(img, 3);
	regions = np.digitize(img, bins=thresholds);
	met = (regions == 2);
	segmented = np.zeros(img.shape, dtype=np.float);
	segmented[met] = img[met];
	plt.imsave(outFilePath, segmented, cmap='gray');

execute(argv[1], argv[2]);
