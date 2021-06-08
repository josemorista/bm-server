import pickle;
import pandas as pd;
from sys import argv;
import numpy as np;
from matplotlib import pyplot as plt
import re;
from skimage.filters import sobel

file = argv[1];
outFolderPath = argv[2];
pattern = '.*\/([\w-]+)(.csv)';
filename = re.findall(pattern, file)[0][0];

df = pd.read_csv(file);

loaded_model = pickle.load(open(argv[4], 'rb'))
result = loaded_model.predict_proba(df)

shape = (int(argv[5]), int(argv[6]));
segmented = np.zeros(shape);

probThreshold = float(argv[3]);

for i in range(0, shape[0]):
	for j in range(0, shape[1]):
		if (result[i+j + (i*(shape[1]-1))][1] > probThreshold):
			segmented[i][j] = 1;


edge_result = sobel(segmented)
plt.imsave(f"{outFolderPath}/edg-{filename}.png", edge_result, cmap='gray')

plt.imsave(f"{outFolderPath}/seg-{filename}.png", segmented, cmap='gray')

print('{' + f"\"resultImagePath\":\"seg-{filename}.png\", \"edgeImagePath\":\"edg-{filename}.png\"" + '}');