pipeline {
    agent any

		environment {
			sshuser = credentials('bm-deploy-ssh-user')
			host = credentials('bm-deploy-ssh-host')
			artifact = 'bmsartifact.tgz'
			directory = '/home/ubuntu/bmserver'
			ormconfig = credentials('ormconfig.json')
		}

    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
								sh('cp $ormconfig ./ormconfig.json')
                sh('npm install')
								sh('npm run build')
								sh('cp ./src/modules/exams/providers/GenerateAttributesVectorProvider/implementations/PyGenerateAttributesVectorProvider/pca ./dist/modules/exams/providers/GenerateAttributesVectorProvider/implementations/PyGenerateAttributesVectorProvider/pca')
								sh('cp ./src/modules/exams/providers/GenerateAttributesVectorProvider/implementations/PyGenerateAttributesVectorProvider/scaler ./dist/modules/exams/providers/GenerateAttributesVectorProvider/implementations/PyGenerateAttributesVectorProvider/scaler')
								sh('cp ./src/modules/exams/providers/RandomForestSegmentationProvider/implementations/PyRandomForestSegmentationProvider/rf.model ./dist/modules/exams/providers/RandomForestSegmentationProvider/implementations/PyRandomForestSegmentationProvider/rf.model')
								sh('tar czf $artifact node_modules package.json dist process.json ormconfig.json')
								sh('scp ./$artifact $sshuser@$host:/tmp/$artifact')
								sh('rm -rf ./*')
            }
        }

				stage('Publish') {
					steps {
						sh '''ssh $sshuser@$host << EOF 
							mkdir -p $directory
							rm -rf $directory/dist
							rm -rf $directory/tmp
							rm -rf $directory/node_modules
							rm $directory/package.json
							rm $directory/process.json
							tar -xf /tmp/$artifact -C $directory
							rm /tmp/$artifact
							cd $directory
							mkdir -p ./tmp
							mkdir -p ./uploads
							pm2 delete process.json &> /dev/null
							pm2 start process.json
EOF'''
					}
				}
    }
}
