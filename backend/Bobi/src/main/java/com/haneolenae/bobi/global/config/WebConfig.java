package com.haneolenae.bobi.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOriginPatterns("*") // 허용할 출처 : 특정 도메인만 받을 수 있음
			.allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH") // 허용할 HTTP method
			.exposedHeaders("*")
			.allowedHeaders("*")
			.allowCredentials(true); // 쿠키 인증 요청 허용

		// Swagger UI를 위한 별도의 CORS 설정
		registry.addMapping("/api/v1/ssenbi/swagger-ui/**")
			.allowedOriginPatterns("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
			.allowedHeaders("*")
			.allowCredentials(true);
	}
}