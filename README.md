### DevOps Engineer Coding Challenge

#### Task Description

You are required to set up a local Kubernetes environment using K3S (or any other local Kubernetes setup of your choice). Deploy the provided microservices, which are currently configured using Docker Compose, into the Kubernetes environment. This task will assess your ability to work with Kubernetes, container orchestration, and local development setups.

Once done please answer

#### Requirements

1. **Kubernetes Setup**:
   - Install and configure K3S or an equivalent local Kubernetes solution.
   - Verify that the Kubernetes cluster is running.
   - We are simulating the production setup.

2. **Convert Docker Compose to Kubernetes Manifests**:
   - Convert the provided Docker Compose configuration into Kubernetes manifests (YAML files).
   - Ensure that all services, volumes, and networks are properly translated.
   - Use the provided `docker-compose.yml` file as a reference.
   - Introduce the horizontal scaling of the backend service in the Kubernetes manifests.

3. **Deploy Microservices**:
   - Deploy the microservices into the local Kubernetes cluster.
   - Ensure that all services are running and can communicate with each other.

4. **Testing and Verification**:
   - Verify that all microservices are accessible and functioning correctly.
   - Provide evidence of successful deployment (e.g., screenshots, logs, kubectl output).

#### Deliverables

1. A set of Kubernetes manifests (YAML files) for the microservices.
2. A short report in the `REPORT.md` file detailing the steps taken to set up the local Kubernetes environment and deploy the services.
3. Answer for followup questions below in the `REPORT.md` file (see below)

### Expectations

We expect this challenge to take approximately 3-6 hours. Please don't spend more than 6 hours on this task.
If you find yourself unable to complete all aspects within this timeframe, please submit what you have accomplished along with notes on what you would do next if given more time.


### Questions about CI/CD, Metrics, Logging

1. **CI/CD**
   - How would you set up a basic CI/CD pipeline to build, test, and deploy the microservices to the remote Kubernetes cluster?
   - What deployment strategy would you recommend for deploying updates to the microservices in the Kubernetes cluster, and how would you implement it in the CI/CD pipeline?

2. **Metrics**:
   - What tools or platforms do you use for collecting and visualizing metrics in a Kubernetes environment?
   - What are some key metrics you would monitor for a Kubernetes cluster and why?

3. **Logging**:
   - Describe your approach to centralized logging in a Kubernetes environment.
   - What tools do you prefer for log aggregation and analysis, and why?

4. **Monitoring**:
   - What is your process for setting up monitoring alerts in Kubernetes?
   - How do you ensure high availability and fault tolerance in your monitoring setup?
