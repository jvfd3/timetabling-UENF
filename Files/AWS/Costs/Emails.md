# Email exchanges with AWS Support

## 1. JV - Missing Case + Previous costs + (Tax + Secrets Manager + VPC) + AWS Credits

1. I think I opened a case two days ago, but it's nowhere to be found. Do you have any logs of it or did I just clicked somewhere I shouldn't and it just vanished?

2. What I said in the vanished case was about the origin of the Cost Explorer API usage that was priced. I don't remember using it, but it doesn't mean that I didn't use. So, I would like to know if there is any way in which I could search for what command was used and triggered the API so that I may not use it again for accident.

3. January 17th I started receiving a cost for the usage of AWS Secrets, and at Jan 18th I rolledback to using AWS Environment variables. But I only actually deleted the variables some time later that I don't remember when. Are the variables that are not being actively being used still priced? But even after actually deleting the variables... Nevermind... I just went there to check again and I was seeing Virginia instead of Ohio... I just scheduled a new deletion. So my conclusion for this topic is: "if it's stored, it's priced, even if you are not actually using it anywhere else".

4. Same goes for VPC. It was pricing me 0.12 daily. I think I correctly deleted it yesterday... I guess and it seems to have reduced. But I'm not really sure because of time zone stuff. Let's see if it's 0 tomorrow. URGH! Same thing from last one. Went there to check in Ohio too... I'll leave it as it is for now. Let's see if it will be priced again or not. Actually... Why did the pricing begin at February 1st?

5. What about this Tax? What is it for?

6. I heard that there is a eligible 300$ credit for AWS, I would like to know if these cents could be paid with these credits. I don't know exactly what is the criteria to receive that. I am currently doing my monograph that consists in developing a system to help the CS coordinator in scheduling subjects, professors and rooms. Could you help me understand a little bit more of the credit criteria? For now I'm waiting for this credit because, maybe I don't need to spend some dollars on that 😅.

Well, thanks for your time.

## 2. AWS - Resposta (dei uma limpada no Markdown)

Hello,

I understand that you have a few concerns about a previous case and your AWS account. I will try and address your questions accordingly.

1. There are currently no other open cases for this AWS account, you can follow the instructions in the link below to view your case history. The case may have been opened through a different AWS account. If you have any other AWS account try to log in and check the case history as instructed in the link below.
   [Link](https://docs.aws.amazon.com/awssupport/latest/user/monitoring-your-case.html#case-history )

2. Here in the billing department we have a limited technical background, and the nature of your question is outside our scope of knowledge. Needless to say, I would still like to make sure you get the help you need. I've done some research and found the following information that you may find helpful in providing assistance with the APIs:
   [Monitoring API requests using Amazon CloudWatch](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/monitor.html)
   [How do I use CloudTrail to review what API calls and actions have occurred in my AWS account?](https://repost.aws/knowledge-center/cloudtrail-track-api)

3. Your conclusion is correct  "if it's stored, it's priced, even if you are not actually using it anywhere else". With AWS you pay for your resources that were running per hour or per second, depending on which service you run. If a service is active on your AWS account without being utalized, the service will still be charged. The link below will provide more guidance on how the services are billed

   [Charges incurred from resources in AWS Regions that are turned off](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/checklistforunwantedcharges.html#check-disabled-region )

4. AWS Free Tier for Amazon Elastic Compute Cloud, 12 month free, includes 750 hours of public IPv4 address usage per month. Both existing or new AWS Free Tier customer for Amazon EC2, will get 750 hours (VPC) public IPv4 address usage per month free when launching any EC2 instance with a public IPv4 address. Customers that are eligible for AWS Free Tier for Amazon EC2 and have created their AWS accounts before February 1, 2024 may experience a delay in seeing their free tier usage for public IPv4 addresses in the estimated charges shown in the AWS Billing and Cost Management console. The actual invoice for February will include all eligible public IPv4 addresses free tier usage.

   [New – AWS Public IPv4 Address Charge + Public IP Insights](https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/)

5. The official document to charge Brazilian customers for cloud services provided by AWS SBL is the Nota Fiscal de Serviços eletrônica (“NFS-e”), which includes all applicable local taxes on the service charges in Brazilian Reais (BRL). AWS SBL can issue an NFS-e to a Bra zilian customer only after receiving a valid Tax Registration Number ("TRN") (i.e., CPF/CNPJ). The relevant taxes applicable to AWS cloud services offered locally are the following: PIS and COFINS (9.25%, combined rate) and ISS (2.9%, charged by São Paulo municipality).

   [Link](https://aws.amazon.com/tax-help/Brazil/)

   [AWS SBL](https://aws.amazon.com/legal/aws-sbl/)
   (Scroll down to Tax Questions for more information on Tax)

6. There currently multiple AWS credit providers for AWS in which you can apply for credit. I have found documentation provides the criteria for applying for credits and added the links below. With that said, AWS Activate credits in your AWS account are applied only to offset eligible AWS Services fees and charges incurred during or following the billing cycle in which you receive the credits. AWS Activate credits cannot be used to offset or cover historical AWS bills. For example, if your AWS Activate credits are issued in your AWS account in the month of May, your AWS Activate credits will not count against your AWS bills from April or previous months.

   [Apply for $300 AWS Credits](https://aws-experience.com/amer/smb/exclusive-offers/aws-credits)
   [Apply for Activate credits](https://aws.amazon.com/startups/credits)
   [AWS Activate credit Providers](https://aws.amazon.com/activate/portfolio-detail/)
   [AWS Offers](https://aws.amazon.com/free/offers/)

We can look in to a possible Billing Adjustment for the charges that occured, if all the resources that incurred the charges are deleted and your AWS stays with the Free Tier specifications so taht you do not get charged further
[AWS Free Tier Specifications](https://aws.amazon.com/free/)

We value your feedback. Please share your experience by rating this and other correspondences in the AWS Support Center. You can rate a correspondence by selecting the stars in the top right corner of the correspondence.

Best regards,
Jafar As S.
Amazon Web Services

## 3.1. JV - Acabei me excedendo no segundo tópico. Vou reformular

Thanks for your answer Jafar. It was pretty complete and helpful.

1. For the missing case, I guess that I just didn't click enough next buttons to conclude the creation of the case, so nevermind about it.

2. Thanks for the effort to search for my answer. I checked the cloudTrail and cloudWatch, had a little trouble figuring out the region specific events. cloudTrail have little filtering, sorting and grouping functionalities compared to cloudWatch, but then I (think that I) managed to find it and it seems to have been a script that I used with Python + Boto3.

   "User agent": "Boto3/1.29.0 md/Botocore#1.32.0 ua/2.0 os/linux#5.15.0-88-generic md/arch#x86_64 lang/python#3.10.12 md/pyimpl#CPython cfg/retry-mode#legacy Botocore/1.32.0",
   "requestID": "31f629b7-aa7f-47f0-8461-10c312411869",
   "eventID": "5309f411-4da2-4d08-83ed-a706bbdac27a",

   It doesn't show exactly what I was expecting but it seems good enough for me.

   Just a small issue that I found in this CSV exploration:

   The "User agent" field usually contains semicolons, so it gets a little buggy when opening it with Excel. I had to replace it with a different character. I suggest that you forward this as an minor issue to the development team. Or something like that. (If it's your attribution, if it's not, where could I report it?)
   Example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

3. Nothing to add here.

4. Well... interesting approach. There could be a previous warning about it, but what is done is done. If I understood correctly, I will only be charged if I use Amazon's public IPv4 addresses. If I use my own privated IPv4 or change to IPv6, I won't be charged, right? I'll try it later.

5. Thanks for the information about the taxes. I'll check it later. And pay what is due.

6. What do you mean with "Billing Adjustment"? Could you tell me more about the "tax-exempt status"? I'm not sure if I'm eligible for it.

### LATER

4. My dude... I tried used IPAM insight tool to search for IPv4 IPs to get rid off, but... it has a cost to see if something is being used? Shouldn't it be for free, since it was said like:

   > Public IP Insights
   > In order to make it easier for you to monitor, analyze, and audit your use of public IPv4 addresses, today we are launching Public IP Insights, a new feature of [Amazon VPC IP Address Manager](https://docs.aws.amazon.com/vpc/latest/ipam/view-public-ip-insights.html) that is available to you at no cost.

Hm... did I misread it? Does it mean that "IPAM is free, but not Public IP Insights inside IPAM"?

## 3.2 Adicionando novos adendos ao 4

Thanks for your answer Jafar. It was pretty complete and helpful.

1. For the missing case, I guess that I just didn't click enough next buttons to conclude the creation of the case, so nevermind about it.

2. Thanks for the effort to search for my answer. I checked the cloudTrail and cloudWatch, had a little trouble figuring out the region specific events. cloudTrail have little filtering, sorting and grouping functionalities compared to cloudWatch, but then I (think that I) managed to find it and it seems to have been a script that I used with Python + Boto3.

   "User agent": "Boto3/1.29.0 md/Botocore#1.32.0 ua/2.0 os/linux#5.15.0-88-generic md/arch#x86_64 lang/python#3.10.12 md/pyimpl#CPython cfg/retry-mode#legacy Botocore/1.32.0",
   "requestID": "31f629b7-aa7f-47f0-8461-10c312411869",
   "eventID": "5309f411-4da2-4d08-83ed-a706bbdac27a",

   It doesn't show exactly what I was expecting but it seems good enough for me.

   Just a small issue that I found in this CSV exploration:

   The "User agent" field usually contains semicolons, so it gets a little buggy when opening it with Excel. I had to replace it with a different character. I suggest that you forward this as an minor issue to the development team. Or something like that. (If it's your attribution, if it's not, where could I report it?)
   Example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

3. Nothing to add here.

4. Well... interesting approach. There could be a previous warning about it, but what is done is done. If I understood correctly, I will only be charged if I use Amazon's public IPv4 addresses. If I use my own privated IPv4 or change to IPv6, I won't be charged, right? I'll try it later.

5. Thanks for the information about the taxes. I'll check it later. And pay what is due.

6. What do you mean with "Billing Adjustment"? Could you tell me more about the "tax-exempt status"? I'm not sure if I'm eligible for it.

### Some time later

4. My dude... I hold this answer so that I could try to migrate from IPv4 to IPv6. I'm not sure if I did it correctly, actually, I'm almost certain that I'm still using IPv4. But I was unable to find a way to use RDS only with IPv6. It seems that it only supports IPv4 or dual-stack. Is dual-stack considered as IPv6 usage?

I had enourmous trouble trying to configure my VPC to use IPv6. I'm not sure if I did it correctly. I tried to follow some documentation, like [Working with a DB instance in a VPC](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html) but still, no evident success. Could you help me with a better direction to follow?

## 4. AWS - Resposta Sanhita

Hello

Sanhita here from AWS Billing and Accounts Team! Really hope this email finds you well!

I understand that you have some queries regarding the following:

1. Need help with Cloudtrail "User Agent" CSV semicolons.
2. (VPC) public IPv4 address usage.
3. What is Billing Adjustment and what is Tax Exempt status in AWS.
4. How to use RDS with IPv4.

Please do correct me if I have misunderstood or missed on anything and I will of course put my best effort to provide you with the correct information.

### Account specific Information

Foremost, I will try to assist you some general account specific information. On review, I can see that the Free Tier is active in this account till December 2024. It is recommended to check our Free Tier page [here](https://aws.amazon.com/free/) before launching any service to avoid charges:

There is 1 bill due in your account for the month of January 2024. Kindly check it [here](https://console.aws.amazon.com/billing/home?#/paymentsoverview/payments-due)

Also, look here for the active services and check if there are under Free Tier or incurring charges - [here](https://console.aws.amazon.com/billing/home?#/bills)

---

### Your Questions

1. Cloudtrail "User Agent" CSV semicolons: Please provide a screenshot so that I can talk to the Service Team for you.

2. (VPC) public IPv4 address usage: The current free tier usage for public IPv4 addresses shown in the AWS Billing and Cost Management console is an estimated charge. It is not the actual one. The actual invoice for February will include all eligible public IPv4 addresses free tier usage. Hence we would request you to please wait till the February invoice is generated so that you can check the actual usage.

3. Billing Adjustment is a process where as an one -time exception, the customer services agents advoate for the customers to the Service Team to waive off the bills, provided that the customer has mistakenly used the services or has other genuine reasons that they cannot pay the bill for the current and last 2 months.

   Tax exemption: To get tax excemption, if you are a business or individual outside of US, open a customer support ticket to provide a tax exemption certificate.

4. How to use RDS with IPv6: We are from the AWS Billing and Accounts Department and we do not have expertise in technical field. However, I have dived deep for you and found some relevant document links:

- [RDS IPv6](https://repost.aws/knowledge-center/rds-ipv6)
- [IPv6 Addressing with Amazon RDS](https://aws.amazon.com/blogs/database/ipv6-addressing-with-amazon-rds/)
- [Amazon RDS Supports IPv6](https://aws.amazon.com/about-aws/whats-new/2022/04/amazon-rds-supports-ipv6/)
- [Get Started with IPv6 on AWS Resources content](https://repost.aws/articles/AREREdDTYdSh2-NMBqQJS4wQ/get-started-with-ipv6-on-aws-resources-content)

If you need more information/assistance for it, kindly write back to us via this support case with the error message that you are getting so that I can reach out to the Service Team for you.

---

I hope that the information is helpful to you. If you have any additional questions or concerns, please include them in your next reply.

I am always happy to assist you to the best of my ability.

Thank you again for contacting AWS Support and I look forward to hearing from you soon!

We value your feedback. Please share your experience by rating this and other correspondences in the AWS Support Center. You can rate a correspondence by selecting the stars in the top right corner of the correspondence.

Best regards,
Sanhita B.
Amazon Web Services

## 5. JV

Hello Sanhita! Did you sleep well? I hope so.

Some additions to the queries that you summarized:

About the first one I wouldn't say that I need any particular "help with Cloudtrail 'User Agent' CSV semicolons", but I just wanted to point out that it could be a minor issue that could be reported to the development team. Just like a lazy possible bug report by me.
I tried searching for the same data that I mentioned in the previous message, but I couldn't find it. So, what I will send you is a screenshot of the CSV file that I downloaded from CloudTrail. To exemplify the issue, here is a sample of the data:

```csv
User name,Event time,Event source,Event name,AWS region,User agent;
root,2023-12-19T19:06:07Z,ce.amazonaws.com,GetCostAndUsage,us-east-1,"Mozilla/5.0 (Windows NT 10.0, Win64, x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
```

The issue would be a semicolon that existe in the "User agent" field. I replaced it by a comma to be able to open it with Excel. It's not a big deal. I just wanted to point it out. But we can leave it as it is and focus on the other topics.

---

About the second and fourth topics, my issue is not with the IPv4 usage itself, but with the cost related to it. If its usage is being priced and I can, somehow, chage it to IPv6 and stop being charged for it, I would like to know how to do it. Oh, I later found out that it was a typo by you. You meant IPv6, I guess...

### Answering "My questions"

1. Already talked about it above and I will send you the screenshot.
2. I have no problem with the estimated charge. I just want to know if I'm using, and if I'm being charged for it, if there is a free alternative to it. I understood by the previous answer that if I switch from using Amazon's public IPv4 addresses to my own privated IPv4 or to IPv6, I won't be charged.
3. Well, I think I may be eligible for both, since I mistakenly used paid services and I'm not from the US. Can I use this current case to request the billing adjustment and the tax exemption? If not, I guess I should do as its said [here](https://aws.amazon.com/pt/tax-help/Brazil/#:~:text=Apply%20for%20tax%2Dexempt%20status), right?
4. I may already have read those links, but I'll check them again just in case. I'll send you the error message if I find it. BRB.

#### AWS RDS with IPv6

I'll go through then one by one.

##### [Does Amazon RDS support IPv6 addressing?](https://repost.aws/knowledge-center/rds-ipv6)

- [ ] Amazon RDS supports IPv6 with dual-stack mode.
  - Tried to configure changing
    - Public accessibility: Yes -> No
    - Network type: IPv4 -> Dual-stack mode
    and received the message:
    > We're sorry, your request to modify DB instance ourclassuirds has failed.
    > The modify request failed because it can lead the database to a public dual state, which is not currently supported. Details of the potential conflict follow. Public accessibility: It is active in the current database instance. Network type: DUAL. It is requested in the current modify request.
- > When running on a dual-stack mode, Amazon RDS doesn't allow public accessibility over an internet gateway.
  - But I would need it to be public accessible, so that I can access it with MySQL Workbench, for example. Are there any alternatives to it... Well, I may be going very far from the original topic and I'm not sure if you can help me with that. Where should I find out more about it?
- > When a DB instance is not publicly accessible, EC2 instances and devices outside your VPC can’t connect unless they use AWS Site-to-Site VPN or AWS Direct Connect. [Learn more](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html#USER_VPC.Hiding)
  -  I'll try that.

###### [Working with a DB instance in a VPC > Amazon RDS IP addressing > Dual-stack mode](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html#USER_VPC.IP_addressing.dual-stack-mode:~:text=User%20Guide.-,Dual%2Dstack%20mode,-When%20a%20DB)

##### [IPv6 Addressing with Amazon RDS](https://aws.amazon.com/blogs/database/ipv6-addressing-with-amazon-rds/)

##### [Amazon RDS now supports Internet Protocol Version 6 (IPv6)](https://aws.amazon.com/about-aws/whats-new/2022/04/amazon-rds-supports-ipv6/)

##### [Get started with IPv6 on AWS - Resources & Content](https://repost.aws/articles/AREREdDTYdSh2-NMBqQJS4wQ/get-started-with-ipv6-on-aws-resources-content)


