"use client";

import ContentCard from "@/app/components/common/card/ContentCard";
import BorderTag from "@/app/components/common/tag/BorderTag";
import FilledTag from "@/app/components/common/tag/FilledTag";
import CustomerCard from "@/app/components/common/card/CustomerCard";
import TagList from "@/app/components/common/tag/TagList";
import FloatingMenuButton from "@/app/components/common/button/FloatingMenuButton";
import { useState } from "react";
import { TagType } from "@/types/tag/tagTypes";

/*
필수!!
  모든 페이지는 첫 줄에
 <div className="page-container"> 필수
 bottom 바 스타일 조정때문!! 
*/

export default function Example() {
  const [tags, setTags] = useState<TagType[]>([
    {
      tagName: "VIP",
      tagColor: "RED",
      tagId: 0,
    },
    { tagName: "Frequent Buyer", tagColor: "ORANGE", tagId: 1 },
    { tagName: "New Customer", tagColor: "GREEN", tagId: 2 },
    {
      tagName: "very very long long tag name",
      tagColor: "PURPLE",
      tagId: 3,
    },
  ]);
  const [customers, setCustomers] = useState<TagType[]>([]);

  return (
    <div className="page-container">
      <ContentCard
        imgSrc={"https://via.placeholder.com/150"}
        title={"제목"}
        content={"설명"}
      />
      <div style={{ paddingInline: 8 }}>
        <TagList
          tags={tags}
          setTags={setTags}
          customers={customers}
          setCustomers={setCustomers}
          canAddCustomer
          maxTagCount={2}
        />
      </div>
      <CustomerCard
        name="길동"
        phoneNumber="010-1111-1111"
        tags={[
          {
            tagName: "VIP",
            tagColor: "RED",
            tagId: 11,
          },
          {
            tagName: "Frequent Buyer",
            tagColor: "ORANGE",
            tagId: 12,
          },
          {
            tagName: "New Customer",
            tagColor: "GREEN",
            tagId: 13,
          },
        ]}
      />
      <BorderTag color="RED" tagName="빨강" />
      <BorderTag color="PINK" tagName="핑크" />
      <BorderTag color="SALMON" tagName="살몬" />
      <BorderTag color="ORANGE" tagName="주황" />
      <BorderTag color="YELLOW" tagName="노랑" />
      <BorderTag color="LIME" tagName="라임" />
      <BorderTag color="GREEN" tagName="초록" />
      <BorderTag color="SKYBLUE" tagName="하늘" />
      <BorderTag color="BLUE" tagName="파랑" />
      <BorderTag color="PURPLE" tagName="보라" />
      <BorderTag color="BEIGE" tagName="베이지" />
      <BorderTag color="GRAY" tagName="회색" />

      <FilledTag color="RED" tagName="빨강" />
      <FilledTag color="PINK" tagName="핑크" />
      <FilledTag color="SALMON" tagName="살몬" />
      <FilledTag color="ORANGE" tagName="주황" />
      <FilledTag color="YELLOW" tagName="노랑" />
      <FilledTag color="LIME" tagName="라임" />
      <FilledTag color="GREEN" tagName="초록" />
      <FilledTag color="SKYBLUE" tagName="하늘" />
      <FilledTag color="BLUE" tagName="파랑" />
      <FilledTag color="PURPLE" tagName="보라" />
      <FilledTag color="BEIGE" tagName="베이지" />
      <FilledTag color="GRAY" tagName="회색" />
      <FloatingMenuButton text="메뉴 열기">
        <div>menu1</div>
        <div>메뉴2</div>
      </FloatingMenuButton>
    </div>
  );
}
