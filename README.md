# TestSequencer

## Architecture 
- cloud (potentially can offer custom on-premises hosting service for data-sensitive applications)
  - Kubernetes web services cluster :
    - front-end client
      - used by superadmins for account creation/administration, user creation/administration
      - used by admins for user creation/administration, product creation/administration
    - web API
      - receiving data from remote nodes
      - serving data to front-end
      - persisting received data to storage
  - cloud nosql database
    - stores real-time data and state
    - functions as a data lake for 'relatively recent' data (exact definition of 'relatively recent', TBD)
    - will be configured to perform archiving of data older than 'relatively recent' to S3 or other cloud object storage
  - on-premises
    - local nosql instance for generated data awaiting upload to cloud
    - TestNodeLogicEngine background service that will be responsible for running physical test logic/interfacing with equipment
    - TestNodeLifeline background service for communicating time-sensitive test state data to cloud for updating front-end
    - TestNodeUploader background service for performing migration of on-premises data to cloud
    - TestNodeSupervisor background service for monitoring TestLogicEngine, TestLifeline, TestUploader service states and reporting state of node to cloud for update in front-end

## Roles
- superadmin
  - rights :
    - create accounts 
    - administer accounts
    - administer users of any account
    - create users for any account
- admin
  - rights : 
    - create users of assigned account
    - administer users of assigned account
    - create products
    - enable integrations
    - configure integrations
    - debug integrations
    - configure products
    - connect subtest logic
    - assign products to technicians
- business intelligence user (biuser)
  - rights :
    - view current status of all products for an account
    - view dashboard
- technician
  - rights :
    - view current status of products-under-test assigned to user
    - perform subtest steps

## Features
- create account
- modify account details such as name, address, etc
  - with the exception of account ID
- create users for account
- create product for account
- get list of all available integrations
- get boolean of whether an integration is enabled by name of integration
- modify integration's enabled state
- get list of all enabled integrations' current configurations
- modify configuration of integration
- get [X] last debug messages of integration by name of integration
- get current configuration of integration by name of integration
- modify a configuration for a product-under-test
- get current summary state of products-under-test by product-under-test ID
- get current summary state of all active products-under-test
- get current summary state of products-under-test by assigned user ID
- send a user action to logic engine
- perform execution of executable-per-test
- persist data generated by test execution to storage
