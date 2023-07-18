node('node') {
    stage('SCM') {
        git branch: 'master', url: 'https://github.globant.com/mf-munoz/Newman-test.git'
    }
    stage('Build') {
        sh 'npm prune'
        sh 'npm install'
    }
    stage('Test') {
        sh 'npm run test'
    }
    post {
        success {
            echo 'The Pipeline success'
        }
        failure {
            echo 'The Pipeline failed'
        }
        always {
            junit 'testResults/xml/*.xml'
        }
    }
}
