from skimage import io, img_as_ubyte, img_as_float;
from sys import argv;
import numpy as np;
import re;

pattern = '.*\/(?:org-)([\w-]+)(.png)';
filename = re.findall(pattern, argv[1])[0][0];
outFolderPath = argv[3];

def execute(orgImgPath: str, edgeImgPath: str) -> str:
	org = img_as_float(io.imread(orgImgPath));
	edged = io.imread(edgeImgPath, as_gray=True);
	
	result = np.zeros(org.shape);

	for i in range(0, org.shape[0]):
		for j in range(0, org.shape[1]):
			if(edged[i][j] > 0):
				result[i][j] = (1, 0, 0, 1);
			else:
				result[i][j] = org[i][j];

	
	io.imsave(f"{outFolderPath}/ove-{filename}.png", img_as_ubyte(result));
	print(f"ove-{filename}.png", end='');

execute(argv[1], argv[2]);
