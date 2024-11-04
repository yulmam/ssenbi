package com.haneolenae.bobi.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiCode {

	// Success
	S10000("SUCCESS"),
	S10001("CREATED"),

	E10001("This Error is sample error"),

	X10000("SERVER_ERROR"),

	A40001("ID 또는 비밀번호를 다시 확인하세요."),
	A40101("리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요."),
	A40102("액세스 토큰 유효하지 않습니다. 갱신을 받아주세요."),
	A40301("토큰이 일치하지 않습니다."),

	M40001("입력된 데이터가 잘못되었습니다."),
	M40101("비밀번호가 일치하지 않습니다."),
	M40401("사용자가 존재하지 않습니다."),
	M40901("이미 가입된 회원이 존재합니다."),

	C40401("유효한 커스텀 템플릿을 찾지 못했습니다."),

	G40401("유효한 제내랄 템플릿을 찾지 못했습니다");

	private final String msg;
}
