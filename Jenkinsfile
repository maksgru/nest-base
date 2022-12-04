properties([])

 def dockerImage

node {
    prepareJob()
    buildImage()
    runTestUnit()
}

void prepareJob() {
    cleanWs()
    checkout scm

    def envVariablesJson = readJSON file: './config/configVariables.json'

    sh "echo $envVariablesJson"

    envVariablesJson.issues.each{issue->
        println 'issue is'
        println issue
}

    def secrets = getListOfSecretes(envVariablesJson)

    sh "echo $secrets"
}

void buildDockerImage() {
    stage('build') {
        dockerImage = docker.build("my-image:${env.BUILD_ID}", '-f Dockerfile .')
    }
}

def getListOfSecretes(secrets) {
    secretsOut = []
    for (secret in secrets) {
        "echo secret is - $secret"
        secretsOut+=["vaultKey": secret]
    }
    return secretsOut
}

void runTestUnit() {
    stage('test:unit') {
        dockerImage.inside {
            sh 'yarn install'
            sh 'yarn test:unit'
        }
    }
}

void getVaultVariables() {

}

void loadEnvToDockerImage() {

}

void pushDockerImage() {
    stage('push') {

    }
}

void depoy() {

}

void sonarCubeCheck() {

}
