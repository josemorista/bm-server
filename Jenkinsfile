pipeline {
    agent any
    
    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
							sh """
                npm install
								tar czf bmsartifact.tgz node_modules package.json docker-compose.yml tmp uploads ormconfig.sample.json src
								scp ./bmsartifact.tgz ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com:/tmp/bmsartifact.tgz
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com << EOF 
							cd /tmp
							rm -rf /home/ubuntu/bmdeploy/*
							tar -xf bmsartifact.tgz -C /home/ubuntu/bmdeploy
							rm bmsartifact.tgz
EOF"""
					}
				}
    }
}