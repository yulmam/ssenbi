package com.haneolenae.bobi.domain.member.service;

import java.util.UUID;

import com.haneolenae.bobi.domain.member.dto.request.MemberRegistRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdatePasswordRequest;
import com.haneolenae.bobi.domain.member.dto.request.MemberUpdateRequest;
import com.haneolenae.bobi.domain.member.dto.response.MemberOverviewResponse;
import com.haneolenae.bobi.domain.member.dto.response.MemberResponse;

public interface MemberService {
	public MemberResponse get(Long id);

	public MemberOverviewResponse getOverview(String accessToken);

	public void regist(MemberRegistRequest memberRegistRequest);

	public void update(String accessHeader, MemberUpdateRequest request);

	public void updatePassword(String accessHeader, MemberUpdatePasswordRequest request);
}
