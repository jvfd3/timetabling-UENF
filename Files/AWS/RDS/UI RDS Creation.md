# Creations

## RDS

### Choose a database creation method

- [X] Standard Create
- [ ] Easy Create

### Engine Options

- Engine type
  - [ ] Amazon Aurora (MySQL compatible)
  - [ ] Amazon Aurora (PostgreSQL compatible)
  - [X] MySQL
  - [ ] MariaDB
  - [ ] PostgreSQL
  - [ ] Oracle
  - [ ] Microsoft SQL Server
  - [ ] IBM Db2
- Edition
  - [X] MySQL Community
- Engine version
  - [ ] Hide filters
    - [ ] Show versions that support the Multi-AZ DB cluster
    - [ ] Show versions that support the Amazon RDS Optimized Writes
  - Engine version
    - [ ] 5.7.37
    - [ ] ...
    - [ ] 8.0.35
    - [X] 8.0.36

### Templates

- [ ] Production
- [ ] Dev/Test
- [X] Free tier

### Availability and durability [disabled]

- Deployment options
  - [ ] Multi-AZ DB Cluster
  - [ ] Multi-AZ DB instance (not supported for Multi-AZ DB Cluster snapshot)
  - [X] Single DB Instance (not supported for Multi-AZ DB Cluster snapshot)

### Settings

- DB instance identifier: `OurClassUIRDS`
- Credentials Settings
  - Master username: `tang`
  - [ ] Manage master credentials in AWS Secrets Manager
  - [ ] Auto generate a password
  - Master password: `annabell`
  - Confirm master password: `annabell`

### Instance configuration

- DB instance class
  - [X] Show filters
    - [ ] Show instance classes that support Amazon RDS Optimized Writes
    - [ ] Include previous generation classes
  - [ ] Standard classes (includes m classes) [disabled]
  - [ ] Memory optimized classes (includes r classes and x classes) [disabled]
  - [X] Burstable classes (includes t classes) [disabled]
    - [X] db.t2.micro (1 vCPUs, 1 GiB RAM, Network: Not EBS optimized)
    - [ ] ...
    - [ ] db.t3.micro (2 vCPUs, 1 GiB RAM, Network: 2085 Mbps)
    - [ ] ...
    - [ ] db.t4g.micro (2 vCPUs, 1 GiB RAM, Network: 2085 Mbps)
    - [ ] ...
    - [ ] db.t4g.xlarge (8 vCPUs, 32 GiB RAM, Network: 2780 Mbps)

<!-- AMAZON Q: A db.t3.micro has the equivalent of 2 vCPUs. Running it continuously 24/7 for a 30-day month would use 720 hours. -->

### Storage

- Storage type
  - [ ] General Purpose (SSD) (gp2) - Baseline performance determined by volume size
  - [X] General Purpose (SSD) (gp3) - Performance scales independently from storage
  - [ ] Provisioned IOPS (SSD) (io1) - Flexibility in provisioning I/O
  - [ ] Magnetic - Limited to a maximum of 1000 IOPS (not recommended)
- Allocated storage: `5`
- Storage autoscaling
  - [ ] Enable storage autoscaling

### Connectivity

- Compute Resource
  - [X] Don't connect to an EC2 compute resource
  - [ ] Connect to an EC2 compute resource
    - [ ] EC2 instance
      - [ ] Choose an EC2 instance
- Network type
  - [ ] IPv4
  - [X] Dual-stack mode
- Virtual private cloud (VPC)
  - [X] `OurClass_UI_VPC (vpc-Oa8d44f5c22a3f872)`
  - [ ] No Dual compatible VPCs
- DB subnet group
  - [X] Create new DB subnet group
- Public access [Probably allows me to use MySQL Workbench for example]
  - [X] Yes
  - [ ] No
- VPC security group (firewall)
  - [ ] Choose existing
    - Existing VPC Security groups
      - [X] `OurClassUI_EC2_SecurityGroup`
  - [X] Create new
    - New VPC Security group name: `OurClassUI_RDS_SecurityGroup`
- Availability Zone
  - [ ] no preference
  - [X] us-east-2a
  - [ ] us-east-2b
  - [ ] us-east-2c
- RDS Proxy
  - [ ] Create an RDS Proxy [Has additional costs]
- Certificate authority - Optional
  - [ ] rds-ca-2019 - Expiry: Aug 22, 2024
  - [ ] rds-ca-ecc384-g1 - Expiry: May 21, 2121
  - [ ] rds-ca-rsa4096-g1 - Expiry: May 21, 2121
  - [X] rds-ca-rsa2048-g1 (default) - Expiry: May 21, 2061
- Additional configuration - Database port
  - Database port: `3306`

### Database authentication

- [X] Password authentication
- [ ] Password and IAM database authentication
- [ ] Password and Kerberos authentication

### Monitoring

- [ ] Enable Enhanced Monitoring

### Additional configuration

- Database options
  - Initial database name: `OurClassDB`
  - DB parameter group
    - [X] default.mysql8.0
  - Option group
    - [ ] default.mysql8.0
- Backup
  - [ ] Enable automated backups
- Encryption
  - [ ] Enable encryption
- Log exports
  - [ ] Audit log
  - [ ] Error log
  - [ ] General log
  - [ ] Slow query log
  - IAM role
    - RDS service-linked role
- Maintenance
  - [ ] Enable auto minor version upgrade
  - Maintenance window
    - [ ] Choose a window
      - Start day
        - [ ] Monday
        - [ ] Tuesday
        - [ ] Wednesday
        - [ ] Thursday
        - [ ] Friday
        - [ ] Saturday
        - [ ] Sunday
      - Start Time
        - [00:00, 23:59] UTC
      - Duration
        - [0.5, 23.5: 30-minute increments] hours
    - [X] No preference
- Deletion protection
  - [ ] Enable deletion protection

### Estimated monthly costs

| DB instance | Storage  | Total     |
| ----------- | -------- | --------- |
| 12.41 USD   | 0.58 USD | 12.98 USD |

<!-- db.t2.micro; 5x1Gb -->

The Amazon RDS Free Tier is available to you for 12 months. Each calendar month, the free tier will allow you to use the Amazon RDS resources listed below for free:

- 750 hrs of Amazon RDS in a Single-AZ db.t2.micro, db.t3.micro or db.t4g.micro Instance.
- 20 GB of General Purpose Storage (SSD).
- 20 GB for automated backup storage and any user-initiated DB Snapshots.

Learn more about AWS Free Tier.
When your free usage expires or if your application use exceeds the free usage tiers, you simply pay standard, pay-as-you-go service rates as described in the Amazon RDS Pricing page. 

## VPC

### VPC settings

#### Resources to create

- [X] VPC only
- [ ] VPC and more

#### Name tag - optional: `OurClass_UI_VPC`

#### IPv4 CIDR block

- [X] IPv4 CIDR manual input
  - IPv4 CIDR: `10.0.0.0/24`
- [ ] IPAM-allocated IPv4 CIDR block
  - IPv4 IPAM pool: ``
  - Netmask: ``

#### IPv6 CIDR block

- [ ] No IPv6 CIDR block
- [ ] IPAM-allocated IPv6 CIDR block
- [X] Amazon-provided IPv6 CIDR block
- [ ] IPv6 CIDR owned by me

#### Tenancy

- [X] Default
- [ ] Dedicated

### Tags

- Add tag
  - Key: `Name`
  - Value: `OurClass_UI_VPC`

## Create subnet

### VPC [subnet]

- VPC ID: `vpc-Oa968e19081ddd515`
- Associated VPC CIDRs
  - IPv4 CIDR: `10.0.0.0/24`
  - IPv6 CIDR: `2600:1f16:5fa:2000::/56` (us-east-2)

### Subnet Settings

#### Subnet 1/3 [IPV6 - us-east-2a]

- Subnet name: `OurClass_UI_Subnet_01_IPv6`
- Availability Zone: `us-east-2a`
- IPv4 CIDR block
  - [] IPv4 CIDR manual input
    - IPv4 VPC CIDR block: `10.0.0.0/24`
    - IPv4 subnet CIDR block: `10.0.0.0/28`
  - [X] No IPv4 CIDR block
- IPv6 CIDR block
  - [X] Manual input
    - IPv6 VPC CIDR block:
      - [ ] `2600:1f16:1ee5:b100::/56`
    - IPv6 subnet CIDR block: `2600:1f16:1ee5:b100::/64` - 18, 4Q IPs
  - [ ] No IPv6 CIDR block

##### Tags - *optional* [Subnet 1/3]

- Key: `Name`
- Value: `OurClass_UI_Subnet_01_IPv6`

#### Subnet 2/3 [IPV6 - us-east-2b]

- Subnet name: `OurClass_UI_Subnet_02_IPv6_Only`
- Availability Zone: `us-east-2b`
- IPv4 CIDR block
  - [] IPv4 CIDR manual input
    - IPv4 VPC CIDR block: `10.0.0.0/24`
    - IPv4 subnet CIDR block: `10.0.0.0/28`
  - [X] No IPv4 CIDR block
- IPv6 CIDR block
  - [X] Manual input
    - IPv6 VPC CIDR block:
      - [ ] `2600:1f16:1ee5:b100::/56`
    - IPv6 subnet CIDR block: `2600:1f16:1ee5:b101::/64` - 18, 4Q IPs
  - [ ] No IPv6 CIDR block

##### Tags - *optional* [Subnet 2/3]

- Key: `Name`
- Value: `OurClass-UI-Subnet-02-IPv6_Only`

#### Subnet 3/3 [IPV4 & IPV6 - us-east-2c]

- Subnet name: `OurClass_UI_Subnet_03_IPv4_IPv6`
- Availability Zone: `us-east-2c`
- IPv4 CIDR block
  - [X] IPv4 CIDR manual input
    - IPv4 VPC CIDR block: `10.0.0.0/24`
    - IPv4 subnet CIDR block: `10.0.0.0/28`
  - [ ] No IPv4 CIDR block
- IPv6 CIDR block
  - [X] Manual input
    - IPv6 VPC CIDR block:
      - [ ] `2600:1f16:1ee5:b100::/56`
    - IPv6 subnet CIDR block: `2600:1f16:1ee5:b102::/64` - 18, 4Q IPs
  - [ ] No IPv6 CIDR block

### Tags - optional

Key: `Name`
Value: `OurClass-UI-Subnet-01-IPv6_Only`

## EC2 Instances

### Name and tags

- Name: `OurClassUI_EC2_Instance`

### Application and OS Images (Amazon Machine Image)

#### Quick Start

- [X] Amazon Linux
- [ ] macOS
- [ ] Ubuntu
- [ ] Windows
- [ ] Red Hat
- [ ] SUSE Linux
- [ ] Debian
- [ ] Browse more AMIs

#### Amazon Machine Image (AMI)

- [X] Amazon Linux 2023 AMI - Free tier eligible
  - Description: Amazon Linux 2023 AMI 2023.3.20240205.2 x86_64 HVM kernel-6.1
  - Architecture:
    - [ ] 64-bit (x86)
    - [ ] 64-bit (Arm)
- [ ] ...

### Instance type

- [ ] All generations
- Instance type:
  - [ ] t2.nano / Family: t2; 1 vCPU; 0.5 GiB Memory; Current generation: true
  - [X] t2.micro - Free tier eligible / Family: t2; 1 vCPU; 1 GiB Memory; Current generation: true
  - [ ] t2.small / Family: t2; 1 vCPU; 2 GiB Memory; Current generation: true
  - [ ] ...

### Key pair

#### Create key pair

- Key pair name: `OurClassUI_EC2_KeyPair`
- Key pair type:
  - [X] RSA
  - [ ] ED25519
- Private key file format:
  - [X] .pem
  - [ ] .ppk

```text
  -----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQEAiRaPGwtlwfQMOOSAEM8xPaorpm/MfS4Ek4KVXPLfqu0l4/VG
  ...
  2QkOq90WVoSNwTjK4CORn9v/V2GmhdgXUlIkj62IvoDdMGWBOm4=
  -----END RSA PRIVATE KEY-----
```

### Network settings

- VPC - **required**
  - [X] vpc-Oa8d44f5c22a3f872 (OurClass_UI_VPC) / 10.0.0.0/24; 2600:1f16:1ee5:b100::/56
- Subnet
  - [X] subnet-08aOd9e028655a423 (OurClass_UI_Subnet_01_IPv6) / VPC: vpc-Oa8d44f5c22a3f872; ...; IP addresses available: 0
- Auto-assign Public IP
  - [ ] Disable
  - The selected subnet does not support IPv4 addresses.
- Auto-assign IPv6 IP
  - [X] Enable
  - [ ] Disable
- Firewall (security group)
  - [ ] Create security group
  - [ ] Select existing security group
    - Common security groups
      - [ ] `OurClassUl_EC2_SecurityGroup`; sg-Ob1e5a21b529fc33d; VPC: `vpc-Oa8d44f5c22a3f872`

#### Advanced network configuration

### Configure storage - Simple

- 1x
  - `8` GiB
  - [ ] `General Purpose SSD (gp2)` Root volume
  - [X] `General Purpose SSD (gp3)` Root volume
  - [ ] `Provisioned IOPS SSD (io1)` Root volume
  - [ ] `Provisioned IOPS SSD (io2)` Root volume
  - [ ] `Cold HDD (sc1)` Root volume [disabled]
  - [ ] `Throughput Optimized HDD (st1)` Root volume [disabled]
  - [ ] `Magnetic` Root volume (standard)

- Free tier eligible customers can get up to 30 GB of General Purpose SSD or Magnetic storage

- No Data Lifecycle Manager policies targeting this instance

#### File systems

- [ ] EFS
- [ ] FSx

### Advanced details

...

### Summary

- Number of instances: `1`

#### Review commands

The following API calls will be used to launch your instance.

Instance setup
API call: RunInstances
The following input will be used in the SDK RunInstances request

```json
{
  "MaxCount": 1,
  "MinCount": 1,
  "ImageId": "ami-0c20d88b0021158c6",
  "InstanceType": "t2.micro",
  "KeyName": "OurClassUI_EC2_KeyPair",
  "EbsOptimized": false,
  "NetworkInterfaces": [
    {
      "SubnetId": "subnet-08a0d9e028655a423",
      "AssociatePublicIpAddress": false,
      "DeviceIndex": 0,
      "Ipv6AddressCount": 1,
      "Groups": [
        "sg-0b1e5a21b529fc33d"
      ]
    }
  ],
  "TagSpecifications": [
    {
      "ResourceType": "instance",
      "Tags": [
        {
          "Key": "Name",
          "Value": "OurClassUI_EC2_Instance"
        }
      ]
    }
  ],
  "MetadataOptions": {
    "HttpTokens": "required",
    "HttpEndpoint": "enabled",
    "HttpPutResponseHopLimit": 2
  },
  "PrivateDnsNameOptions": {
    "HostnameType": "resource-name",
    "EnableResourceNameDnsARecord": false,
    "EnableResourceNameDnsAAAARecord": true
  }
}
```

### Launch instance

Instance launch failed
IPv6 addresses are not supported on t2.micro

## VPC > Security Groups > Create security group

### Basic details

- Security group name: `OurClassUI_EC2_SecurityGroup`
- Description: `UI created security group for EC2 instance`
- VPC
  - [X] vpc-Oa8d44f5c22a3f872 (OurClass_UI_VPC)

### Inbound rules

#### Inbound rule 1

- Type
  - [ ] ...
  - [X] All traffic
  - [ ] ...
- Protocol [Disabled]
  - [X] All
- Port range [Disabled]
  - [X] All
- Source type
  - [ ] Custom
  - [X] Anywhere IPv4
  - [ ] Anywhere IPv6
  - [ ] My IP
- Source
  - [X] `0.0.0.0/0`
- Description - optional
  - `I think that I am allowing my system to receive date from anywhere using IPv4`

#### Inbound rule 2

- Type
  - [ ] ...
  - [X] All traffic
  - [ ] ...
- Protocol [Disabled]
  - [X] All
- Port range [Disabled]
  - [X] All
- Source type
  - [ ] Custom
  - [ ] Anywhere IPv4
  - [X] Anywhere IPv6
  - [ ] My IP
- Source
  - [X] `::/0`
- Description - optional
  - `I think that I am allowing my system to receive date from anywhere using IPv6`

### Outbound rules

#### Outbound rule 1

- Type:
  - [ ] `Custom TCP`
  - [ ] `Custom UDP`
  - [ ] `Custom ICMP - IPv4`
  - [ ] `Custom Protocol`
  - [ ] `All TCP`
  - [ ] `All UDP`
  - [ ] `All ICMP - IPv4`
  - [ ] `All ICMP - IPv6`
  - [X] `All traffic`
  - [ ] `SSH`
  - [ ] `SMTP`
  - [ ] `DNS (UDP)`
  - [ ] `DNS (TCP)`
  - [ ] `HTTP`
  - [ ] `POP3`
  - [ ] `IMAP`
  - [ ] `LDAP`
  - [ ] `HTTPS`
  - [ ] `SMB`
  - [ ] `SMTPS`
  - [ ] `IMAPS`
  - [ ] `POP3S`
  - [ ] `MSSQL`
  - [ ] `NFS`
  - [ ] `MYSQL/Aurora`
  - [ ] `RDP`
  - [ ] `Redshift`
  - [ ] `PostgreSQL`
  - [ ] `Oracle-RDS`
  - [ ] `WinRM-HTTP`
  - [ ] `WinRM-HTTPS`
  - [ ] `Elastic Graphics`
  - [ ] `CQLSH / CASSANDRA`
- Protocol [Disabled]
  - [X] All
- Port range [Disabled]
  - [X] All
- Destination type
  - [ ] Custom
  - [ ] Anywhere IPv4
  - [X] Anywhere IPv6
  - [ ] My IP
- Destination
  - [X] `::/0`
- Description - optional
  - `I think that I am allowing my system to send date to anywhere using IPv6`

#### Outbound rule 2

- Type:
  - [ ] `Custom TCP`
  - [ ] `...`
  - [X] `All traffic`
  - [ ] `...`
  - [ ] `CQLSH / CASSANDRA`
- Protocol [Disabled]
  - [X] All
- Port range [Disabled]
  - [X] All
- Destination type
  - [ ] Custom
  - [X] Anywhere IPv4
  - [ ] Anywhere IPv6
  - [ ] My IP
- Destination
  - [X] `0.0.0.0/0`
- Description - optional
  - `I think that I am allowing my system to send date to anywhere using IPv4`

### Tags - optional [Security Group]

- Key: `Name`
- Value: `OurClassUI_EC2_SecurityGroup`
