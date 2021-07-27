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
