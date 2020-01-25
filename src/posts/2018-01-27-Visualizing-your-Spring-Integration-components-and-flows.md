---
date: 2018-01-27T00:00:00.000Z
title: 'Visualizing your Spring Integration components & flows'
image: ../img/2018-01-27-Visualizing-your-Spring-Integration-components-and-flows/post-image.jpg
tags:
    - Spring
    - Integration
    - Spring Integration
    - EIP
    - Microservices
category: Architecture
---

> This post can be useful for everyone who wants to have insights on their application's internal architecture when integrating with other systems using Spring Integration.
> From the developer that just started in your team and who wants to have an overview, to the seasoned team member that needs to troubleshoot a problem in production.

Currently we are working on the phased roll out of a microservices architecture at one of our clients.
To ensure that everything works as it's supposed to we are using a lot of <a href="http://enterpriseintegrationpatterns.com/" target="_blank">Enterprise Integration Patterns</a> to stitch both the old and the new landscape together.
The best way to achieve a solution when using Java, is to use Spring Integration.
A few days ago we wanted to have clear insights on how certain microservices are communicating with the existing systems.

## Creating your graph of Spring Integration components and flows

A first step to expose your Spring Integration components and flows is to add an `IntegrationGraphServer` bean to your application.
This class resides in the `o.s.i.support.management.graph` package, between all the required classes to collect, build and render the runtime state of Spring Integration components as a single tree-like `Graph` object.

## Exposing the graph

Using the Spring Integration HTTP module you can easily expose the `IntegrationGraphServer` functionality as a REST service.
Just add the `@EnableIntegrationGraphController` annotation to your application, and you're good to go!
Or, in case you are using XML config, add the `<int-http:graph-controller/>` XML element to your setup.
Be sure to edit the `allowedOrigins` attribute of the annotation in case you're accessing the endpoint between 2 domains.
Sidenote: your application needs to be deployed on a web container, or it needs to use an embedded web container in case you are building on top of Spring Boot.

## Visualizing the exposed graph of components and flows

With <a href="https://d3js.org/" target="_blank">D3.js</a> we are able to visualize everything within our graph.
In <a href="https://gist.github.com/TYsewyn/99f86b42ec4fbedf06db611a1a04bea4" target="_blank">this quick & dirty gist</a> I created, you can find a simple example of a possible visualisation.
Download the `index.html` file, point the script to the correct endpoint by editing the `graphEndpoint` variable, open the file in your browser and you should see every component and flow!

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true"><p lang="en" dir="ltr">Cool. Also see the spring-flo-si sample (part of the spring-flo project) - it&#39;s on the angular-1x branch <a href="https://t.co/7PJhXJC6wF">https://t.co/7PJhXJC6wF</a> - also a spring-integration &quot;file-split-ftp&quot; sample app here: <a href="https://t.co/CURcJGppqz">https://t.co/CURcJGppqz</a></p>&mdash; Gary Russell 🍃 🏌️‍ (@gprussell) <a href="https://twitter.com/gprussell/status/957370937741111296">January 27, 2018</a></blockquote>

As Gary Russell pointed out in his reply to my tweet after I published this post, you can also use Spring Flo for the visualization.
Spring Flo is an Angular based, embeddable graphical component for pipeline/graph building and editing.
This is used as the basis of the stream builder in Spring Cloud Data Flow.
You can find the sample application <a href="https://github.com/spring-projects/spring-flo/tree/angular-1.x/samples/spring-flo-si" target="_blank">here</a>.

## Taking it one step further

If you add the `@EnableIntegrationManagement` annotation or the `<int:management />` XML element to your setup, the graph will even expose all the metrics of your Spring Integration components.
This will definitely help you out when you want to monitor your components and flows, enabling you to troubleshoot problems even faster in case something goes wrong in production.