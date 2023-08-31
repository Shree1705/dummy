pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_login')
        DOCKERHUB_REPO = 'divanshreevatsa/jenkins_test_docker'
    }

    stages {
        stage('Build and Push Backend') {
            steps {
                dir('backend') {
                    checkout scm
                    script {
                        def imageTag = "backend-${BUILD_NUMBER}"
                        sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
                        sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                        sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
                    }
                }
            }
        }

        stage('Build and Push Frontend') {
            steps {
                dir('frontend') {
                    checkout scm
                    script {
                        def imageTag = "frontend-${BUILD_NUMBER}"
                        sh "docker build -t ${DOCKERHUB_REPO}:${imageTag} ."
                        sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                        sh "docker push ${DOCKERHUB_REPO}:${imageTag}"
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    def backendImageTag = "backend-${BUILD_NUMBER}"
                    def frontendImageTag = "frontend-${BUILD_NUMBER}"
                    sh "docker-compose pull" // Pull the latest images from Docker Hub
                    sh "docker-compose up -d" // Run the containers
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
