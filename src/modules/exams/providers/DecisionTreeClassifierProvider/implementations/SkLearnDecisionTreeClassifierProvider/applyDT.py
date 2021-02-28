import pandas as pd;
from sys import argv
from sklearn.tree import DecisionTreeClassifier;
import pickle;
import json;

loaded_model = pickle.load(open(argv[1], 'rb'));

def execute(attributesAsJsonString):
	jsonDict = json.loads(attributesAsJsonString);
	data = pd.DataFrame.from_dict([jsonDict], orient='columns');
	data = data.drop(columns=['previousQt', 'previousRt', 'previousCancerDiagnosis', 'previousBoneLesions'])
	prediction = loaded_model.predict([data.iloc[0]]);
	print(prediction[0]);

execute(argv[2]);
