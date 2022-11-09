pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
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
