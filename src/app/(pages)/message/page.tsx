"use client";

import SearchBar from "@/app/components/common/input/SearchBar";
import MessageCard from "@/app/components/common/card/MessageCard";
import { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import Header from "@/app/components/layout/Header";
import { getEveryMessagesAPI } from "@/app/api/message/messageAPI";
import {
  MessageCardPropsType,
  SortOptionKeys,
  SORTOPTIONS,
} from "@/types/message/messageTypes";
import { debounce } from "lodash";
import SortSelect from "@/app/components/common/select/SortSelect";
import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import { useRouter } from "next/navigation";

export default function MessagePage() {
  const router = useRouter();
  const [curSortOption, setCurSortOption] = useState<SortOptionKeys>("최신순");
  const [searchValue, setSearchValue] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageCardPropsType[]>([]);
  const handleNewMessage = () => {
    router.push("/message/create");
  };

  useEffect(() => {
    router.prefetch("/message/create");
  }, [router]);

  useEffect(() => {
    const fetchMessageList = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {
          sort: SORTOPTIONS[curSortOption],
        };

        if (searchValue.trim()) {
          params.keyword = searchValue;
        }

        const response = await getEveryMessagesAPI(params);
        console.log("Fetched Message List:", response);
        setMessageList(response.result);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessageList();
  }, [searchValue, curSortOption]);

  const handleSearchChange = debounce((value: string) => {
    setSearchValue(value);
  }, 300);

  const handleSortChange = (key: keyof typeof SORTOPTIONS) => {
    setCurSortOption(key);
  };

  return (
    <div className="page-container ">
      <Header title="메시지" />

      <div className="search-bar-container">
        <div className="search-bar-contents">
          <SearchBar
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="검색어 (이름, 내용, 태그)"
          />
          <SortSelect
            curOption={curSortOption}
            options={Object.keys(SORTOPTIONS)}
            onChange={(selectedLabel) =>
              handleSortChange(selectedLabel as keyof typeof SORTOPTIONS)
            }
          />
        </div>
      </div>

      <div className="message-list">
        {messageList &&
          messageList.map((message) => (
            <Link
              href={`/message/${message.messageId}`}
              key={message.messageId}
            >
              <MessageCard
                messageId={message.messageId}
                messageContent={message.messageContent}
                messageTags={message.messageTags}
                messageCustomers={message.messageCustomers}
                messageSendAt={message.messageSendAt}
              />
            </Link>
          ))}
      </div>
      <FloatingActionButton onClick={handleNewMessage} text="메시지 작성하기" />
    </div>
  );
}
