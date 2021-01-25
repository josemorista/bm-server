pipeline {
    agent any

		environment {
			artifact = 'bmsartifact.tgz'
			directory = '/home/ubuntu/bmdeploy'
		}

    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
							sh """
                npm install
								tar czf $artifact node_modules package.json docker-compose.yml tmp uploads ormconfig.sample.json src process.json tsconfig.json
								scp ./$artifact ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com:/tmp/$artifact
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com << EOF 
							cd /tmp
							rm -rf $directory/*
							tar -xf $artifact -C $directory
							rm $artifact
							cd $directory
							mv ./ormconfig.sample.json ./ormconfig.json
							sudo docker-compose up -d
							pm2 delete process.json &> /dev/null
							pm2 start process.json
EOF"""
					}
				}
    }
}
