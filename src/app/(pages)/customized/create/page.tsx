"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/common/input/InputField";
import TagList from "@/app/components/common/tag/TagList";
import { postCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import Cookies from "js-cookie";
import { TagType } from "@/types/tag/tagTypes";
import Modal from "@/app/components/common/modal/Modal";
import ChatAIContainer from "@/app/components/chat/ChatAIContainer";

export default function CustomizedNewPage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  // TODO: 수정 필요 - 추가 로직 및 API와 연결
  const [selectedCustomers] = useState<number[]>([]);
  const [isAIEditModalOpen, setIsAIEditModalModalOpen] =
    useState<boolean>(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCancel = () => {
    router.back();
  };

  const changeTag = (tags: TagType[]) => {
    setSelectedTags(tags);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;

      // console.log({
      //   title,
      //   content,
      //   customers: selectedCustomers,
      //   tags: selectedTags,
      // });

      const response = await postCustomTemplateAPI({
        title,
        content,
        customers: selectedCustomers,
        tagIds: selectedTags.map((v) => v.tagId),
      });

      console.log(response);

      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
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

  return (
    <div className="page-container">
      <Header title="새 커스텀" showBackIcon={true} />

      <InputField
        label="제목"
        type="text"
        value={title}
        onChange={handleTitle}
        maxLength={20}
      />

      <div className="customized-new_form-group">
        <label className="customized-new_form-group__label">태그 및 고객</label>
        <div className="customized-new_tag-container">
          <TagList tags={selectedTags} setTags={changeTag} maxTagCount={5} />
        </div>
      </div>

      <div className="customized-new_form-group">
        <label className="customized-new_form-group_label">내용</label>
        <textarea
          className="customized-new_form-group_textarea body-medium"
          value={content}
          onChange={handleContent}
        />
      </div>

      <div className="customized-new_button-group">
        <button
          onClick={handleCancel}
          type="button"
          className="customized-new_button white_button"
        >
          취소
        </button>
        <button
          onClick={openAIModal}
          type="button"
          className="customized-new_button gradient_button"
        >
          쎈비 AI 도움 받기
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="customized-new_button blue_button"
        >
          작성
        </button>
      </div>

      {isAIEditModalOpen && (
        <Modal
          isOpen={isAIEditModalOpen}
          onClose={closeAIEditModal}
          title={"AI 쎈비와 문자 작성하기"}
        >
          <ChatAIContainer
            onClose={closeAIEditModal}
            onSave={handleSaveMessage}
            initialContent={content}
          />
        </Modal>
      )}
    </div>
  );
}
