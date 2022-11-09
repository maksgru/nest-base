pipeline {
  agent {
    docker { image 'node:16.13.1-alpine' }
  }
    stages {
        stage('Build') {
            steps {
                sh 'yarn'
            }
        }
        stage('Test'){
            steps {
                sh 'yarn test:unit'
            }
        }
    }
}
