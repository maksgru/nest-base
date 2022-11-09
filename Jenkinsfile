pipeline {
  agent { dockerfile true }
  environment {
    NODE_ENV = 'test'
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
