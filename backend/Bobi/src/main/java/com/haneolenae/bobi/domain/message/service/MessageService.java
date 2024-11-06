package com.haneolenae.bobi.domain.message.service;

import java.util.List;

import com.haneolenae.bobi.domain.message.dto.request.SendMessageRequest;
import com.haneolenae.bobi.domain.message.dto.response.MessageDetailResponse;
import com.haneolenae.bobi.domain.message.dto.response.MessageResponse;

public interface MessageService {

	void sendMessage(long memberId, SendMessageRequest sendMessageRequest);

	List<MessageResponse> getMessageList(long memberId, String keyword);

	MessageDetailResponse getMessageDetail(long memberId, long messageId);

	void deleteMessage(long memberId, long messageId);

	void sendCoolSms(String receiverPhone, String msg);
}
