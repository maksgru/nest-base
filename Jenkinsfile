node {
    cleanWs()
    checkout scm
    stage('test') {
        def dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
        dockerImage.inside {
            sh 'yarn install'
            sh 'yarn test:unit'
        }
    }
}
