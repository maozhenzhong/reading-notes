# 什么是CORS(Cross-origin resource sharing)？

--

## 回答

跨源资源共享或CORS是一种机制，它使用其他HTTP标头授予浏览器从不同于网站源的源服务器访问资源的权限。

跨源请求的一个示例是由其提供的Web应用程序，http://mydomain.com它使用AJAX来发出请求http://yourdomain.com。

出于安全原因，浏览器会限制JavaScript发起的跨源HTTP请求。XMLHttpRequest并fetch遵循同源策略，这意味着使用这些API的Web应用程序只能从访问应用程序的同一源请求HTTP资源，除非来自其他来源的响应包含正确的CORS头。

## 很高兴听到

+ CORS行为不是错误，它是保护用户的安全机制。
+ CORS旨在防止用户可能无意中访问的恶意网站向合法网站发出请求以阅读其个人数据或违背其意愿执行操作。

[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)