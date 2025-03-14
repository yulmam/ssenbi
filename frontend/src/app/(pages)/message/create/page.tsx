"use client";

import React, { useState, useEffect, Suspense } from "react";
import "./page.css";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/layout/Header";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import TagList from "@/app/components/common/tag/TagList";
import { TagType } from "@/types/tag/tagTypes";
import { CustomerType } from "@/types/customer/customerType";
import { postSendMessageAPI } from "@/app/api/message/messageAPI";
import { MessagePostPropsType } from "@/types/message/messageTypes";
import Cookies from "js-cookie";
import { getCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import HashLoading from "@/app/components/common/loading/HashLoading";
import UploadIcon from "@/app/assets/svg/Upload.svg";
import CustomizedListSelector from "@/app/components/common/customized/CustomizedListSelector";
import BatchTextEditor from "@/app/components/common/input/BatchTextEditor";
import { debounce } from "lodash";
import CustomerTagList from "@/app/components/common/tag/CustomerTagList";
import AiModal from "@/app/components/common/modal/AiModal";
import { AxiosError } from "axios";

function MessageCreateContent() {
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);
  const [isCustomListModalOpen, setIsCustomListModalOpen] =
    useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [content, setContent] = useState<string>("");
  const [batchTextFrom, setBatchTextFrom] = useState<string>("");
  const [batchTextTo, setBatchTextTo] = useState<string>("");
  const [isSaveMessageVisible, setIsSaveMessageVisible] =
    useState<boolean>(false);
  const [customerError, setCustomerError] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const templateId = searchParams.get("id") || "";
    setId(templateId);
  }, [searchParams]);

  useEffect(() => {
    if (id) {
      fetchCustomTemplate(id);
    }
  }, [id]);

  const fetchCustomTemplate = async (templateId: string) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const data = await getCustomTemplateAPI({ token, templateId });

      console.log(data);

      const { templateContent, templateCustomers, templateTags } = data.result;
      setCustomers(templateCustomers);
      setContent(templateContent);
      setTags(templateTags);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const sendMessage = debounce(async () => {
    if (!customers.length && !tags.length) {
      setCustomerError(true);
      return;
    }
    setCustomerError(false);
    if (!content) {
      setMsgError(true);
      return;
    }
    setMsgError(false);
    try {
      const messageData: MessagePostPropsType = {
        messageCustomerIds: customers.map((customer) => customer.customerId),
        messageTagIds: tags.map((tag) => tag.tagId),
        messageContent: content,
        ...(id ? { customTemplateId: id } : {}),
      };

      await postSendMessageAPI(messageData);
      setIsSaveMessageVisible(true);
      setTimeout(() => setIsSaveMessageVisible(false), 3000);
    } catch (err) {
      const error = (err as AxiosError<{ code: string }>)?.response?.data;

      if (error?.code === "MS40002") {
        setCustomerError(true);
      } else {
        alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
      }
    }
  }, 500);

  const handleCancel = () => {
    router.push("/message");
  };

  const closeAIEditModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  const handleSaveMessage = (content: string) => {
    setContent(content);
  };

  const openAIModal = () => {
    setIsAIEditModalModalOpen(true);
  };

  const handleTags = (newTags: TagType[]) => {
    setTags(newTags);
  };

  const openCustomListModal = () => {
    setIsCustomListModalOpen(true);
  };

  const closeCustomListModal = () => {
    setIsCustomListModalOpen(false);
  };

  const handleBatchTextChange = () => {
    if (batchTextFrom) {
      // batchTextFrom의 특수 문자를 이스케이프 처리
      const escapedBatchTextFrom = batchTextFrom.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );

      const updatedContent = content.replace(
        new RegExp(escapedBatchTextFrom, "g"),
        batchTextTo,
      );

      setContent(updatedContent);
    }
  };

  const getCustomTemplate = (customId: number) => {
    setId(customId.toString());
    closeCustomListModal();
  };

  return (
    <div className="page-container">
      <Header title="새 메시지" showBackIcon={true} />

      {isSaveMessageVisible && (
        <div className="save-message">메세지를 성공적으로 보냈습니다!</div>
      )}

      <div className="message-form">
        <div className="space-between">
          <div className="form-group">
            <label className="form-group_label subheading">받는 사람</label>
            {customerError && (
              <span className="form-error body-small">
                메시지를 받을 사람이 없습니다. 추가해 주세요.
              </span>
            )}
            <div className="tag-container">
              <CustomerTagList
                customers={customers}
                setCustomers={setCustomers}
              />
            </div>
            <div className="tag-container">
              <TagList tags={tags} setTags={handleTags} />
            </div>
          </div>

          <button
            type="button"
            className="message-get_button"
            onClick={openCustomListModal}
          >
            {"커스텀에서 \n가져오기"}
            <UploadIcon className="upload-icon" />
          </button>
        </div>

        <div className="form-group">
          <label className="label subheading">내용</label>
          <textarea
            className="form-group_textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={300}
            placeholder="내용을 입력하세요."
          />
          {msgError && (
            <span className="form-error body-small">
              메시지 내용을 입력해주세요
            </span>
          )}
        </div>

        <BatchTextEditor
          batchTextFrom={batchTextFrom}
          batchTextTo={batchTextTo}
          setBatchTextFrom={setBatchTextFrom}
          setBatchTextTo={setBatchTextTo}
          isEdit={true}
          handleBatchTextChange={handleBatchTextChange}
        />
        <div className="message-new_button-group">
          <button
            onClick={handleCancel}
            type="button"
            className="message_button message-new_button-cancel"
          >
            취소
          </button>
          <button
            onClick={openAIModal}
            type="button"
            className="message_button message-new_button-send gradient_button"
          >
            {"쎈비 AI \n도움 받기"}
          </button>
          <button
            onClick={sendMessage}
            type="button"
            className="message_button message-new_button-send"
          >
            보내기
          </button>
        </div>
      </div>
      {isAIEditModalOpen && (
        <AiModal isOpen={isAIEditModalOpen} onClose={closeAIEditModal}>
          <ChatAIContainer
            onClose={closeAIEditModal}
            onSave={handleSaveMessage}
            content={content}
            customers={customers}
            tags={tags}
          />
        </AiModal>
      )}

      {isCustomListModalOpen && (
        <AiModal isOpen={isCustomListModalOpen} onClose={closeCustomListModal}>
          <CustomizedListSelector getCustomTemplate={getCustomTemplate} />
        </AiModal>
      )}
    </div>
  );
}
export default function MessageCreatePage() {
  return (
    <Suspense fallback={<HashLoading />}>
      <MessageCreateContent />
    </Suspense>
  );
}
