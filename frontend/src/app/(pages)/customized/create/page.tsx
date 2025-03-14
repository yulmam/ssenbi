"use client";

import { useRef, useState } from "react";
import Header from "@/app/components/layout/Header";
import { useRouter } from "next/navigation";
import TagList from "@/app/components/common/tag/TagList";
import { postCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";
import { TagType } from "@/types/tag/tagTypes";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";
import { CustomerType } from "@/types/customer/customerType";
import CustomerTagList from "@/app/components/common/tag/CustomerTagList";
import BatchTextEditor from "@/app/components/common/input/BatchTextEditor";
import "../page.css";
import AiModal from "@/app/components/common/modal/AiModal";

export default function CustomizedNewPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<CustomerType[]>(
    [],
  );
  const [batchTextFrom, setBatchTextFrom] = useState<string>("");
  const [batchTextTo, setBatchTextTo] = useState<string>("");
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);

  const handleCancel = () => {
    router.back();
  };

  const handleBatchTextChange = () => {
    if (batchTextFrom) {
      // batchTextFrom의 특수 문자를 이스케이프 처리
      const escapedBatchTextFrom = batchTextFrom.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      );

      const updatedContent = contentRef.current?.value.replace(
        new RegExp(escapedBatchTextFrom, "g"),
        batchTextTo,
      );

      if (updatedContent && contentRef.current) {
        contentRef.current.value = updatedContent;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      const title = titleRef.current?.value.trim() || "";
      const content = contentRef.current?.value.trim() || "";
      const tagIds = selectedTags.map((tag) => tag.tagId);
      const customerIds = selectedCustomers.map(
        (customer) => customer.customerId,
      );

      const response = await postCustomTemplateAPI({
        title,
        content,
        tagIds,
        customerIds,
      });

      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  };

  const handleSaveContent = (content: string) => {
    if (contentRef.current) contentRef.current.value = content;
  };

  const handleOpenAIModal = () => {
    setIsAIEditModalModalOpen(true);
  };

  const handleCloseAIModal = () => {
    setIsAIEditModalModalOpen(false);
  };

  return (
    <div className="page-container">
      <Header title="새 커스텀" showBackIcon={true} />
      <div className="custom-layout">
        <div className="customized_field-wrapper">
          <span className="subheading">제목</span>
          <input
            className="customized_form-input-field"
            ref={titleRef}
            type="text"
            maxLength={20}
          />
        </div>

        <div className="customized_field-wrapper">
          <label className="subheading">그룹 및 고객</label>
          <div className="customized-new_tag-container">
            <TagList
              tags={selectedTags}
              setTags={setSelectedTags}
              maxTagCount={5}
            />
          </div>
          <div className="customized-new_tag-container">
            <CustomerTagList
              customers={selectedCustomers}
              setCustomers={setSelectedCustomers}
            />
          </div>
        </div>

        <div className="customized_field-wrapper">
          <label className="subheading">내용</label>
          <textarea
            className="body customized_text-area customized_form-input-field"
            ref={contentRef}
            maxLength={300}
          />
        </div>

        <BatchTextEditor
          batchTextFrom={batchTextFrom}
          batchTextTo={batchTextTo}
          setBatchTextFrom={setBatchTextFrom}
          setBatchTextTo={setBatchTextTo}
          isEdit={true}
          handleBatchTextChange={handleBatchTextChange}
        />

        <div className="customized-button-group">
          <button
            onClick={handleCancel}
            type="button"
            className="customized-new_button white_button"
          >
            취소
          </button>
          <button
            onClick={handleOpenAIModal}
            type="button"
            className="customized-new_button gradient_button"
          >
            {"쎈비 AI \n도움 받기"}
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="customized-new_button blue_button"
          >
            작성
          </button>
        </div>
      </div>

      {isAIEditModalOpen && (
        <AiModal isOpen={isAIEditModalOpen} onClose={handleCloseAIModal}>
          <ChatAIContainer
            onClose={handleCloseAIModal}
            onSave={handleSaveContent}
            content={""}
            tags={selectedTags}
            customers={selectedCustomers}
          />
        </AiModal>
      )}
    </div>
  );
}
