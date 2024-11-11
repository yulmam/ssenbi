"use client";

import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import CustomerCard from "@/app/components/common/card/CustomerCard";
import SearchBar from "@/app/components/common/input/SearchBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./CustomerList.css";
import { CustomerType } from "@/types/customer/customerType";
import { getCustomersAPI } from "@/app/api/customer/customerAPI";
import TagFilter from "../tag/TagFilter";
import { TagType } from "@/types/tag/tagTypes";

export default function CustomerList() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const filteredCustomers = customers.filter((customer) => {
    const searchIncluded = customer.customerName.includes(searchValue);

    if (!searchIncluded) return false;
    return (
      selectedTags.length === 0 ||
      selectedTags.some((tag) =>
        customer.customerTags.some((t) => t.tagId === tag.tagId),
      )
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getCustomersAPI();
      setCustomers(result);
    };
    fetchData();
  }, []);

  const handleCreateCustomer = () => {
    router.push("/customer/create");
  };

  return (
    <>
      <div className="controller">
        <SearchBar onChange={setSearchValue} />
        <TagFilter
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>
      <ul className="customer-list">
        {filteredCustomers.map((customer) => (
          <li key={customer.customerId} className="customer-item">
            <Link href={`/customer/${customer.customerId}`}>
              <CustomerCard
                name={customer.customerName}
                phoneNumber={customer.customerPhoneNumber || ""}
                tags={customer.customerTags}
              />
            </Link>
          </li>
        ))}
      </ul>

      <FloatingActionButton onClick={handleCreateCustomer} text={"고객 추가"} />
    </>
  );
}
