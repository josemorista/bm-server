export interface ISegmentedExam {
	examId: string;
	algorithm: 'randomForest' | 'SVM' | 'MLP' | 'naiveBayes';
	threshold: number;
	affectedArea: number;
	classifiedArea: number;
	createdAt: Date | string;
	updatedAt: Date | string;
}