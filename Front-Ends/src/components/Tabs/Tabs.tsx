import React from 'react'
import { Button, CloseButton, Heading, Tabs, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"

interface Item {
  id: string
  title: string
  content: React.ReactNode
}

const items: Item[] = [
  { id: "1", title: "No To-Do", content: "Tab Content" },
  { id: "2", title: "Para Estudar", content: "Tab Content" },
  { id: "3", title: "Documentação para Ler", content: "Tab Content" },
]

const uuid = () => {
  return Math.random().toString(36).substring(2, 15)
}

const Tabes = () => {
  const [tabs, setTabs] = useState<Item[]>(items)
  const [selectedTab, setSelectedTab] = useState<string | null>(items[0].id)

  const addTab = () => {
    const newTabs = [...tabs]

    const uid = uuid()

    newTabs.push({
      id: uid,
      title: `Tab`,
      content: `Tab Body`,
    })

    setTabs(newTabs)
    setSelectedTab(newTabs[newTabs.length - 1].id)
  }

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.id !== id)
      setTabs(newTabs)
    }
  }

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      onValueChange={(e) => setSelectedTab(e.value)}
    >
      <Tabs.List flex="1 1 auto">
        {tabs.map((item) => (
          <Tabs.Trigger value={item.id} key={item.id}>
            {item.title}{" "}
            <CloseButton
              as="span"
              role="button"
              size="2xs"
              me="-2"
              onClick={(e) => {
                e.stopPropagation()
                removeTab(item.id)
              }}
            />
          </Tabs.Trigger>
        ))}
        <Button
          alignSelf="center"
          ms="2"
          size="2xs"
          variant="ghost"
          onClick={addTab}
        >
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs.map((item) => (
          <Tabs.Content value={item.id} key={item.id}>
            <Heading size="xl" my="6">
              {item.content} {item.id}
            </Heading>
            <Text>
              {/* .map com todo as tasks da aba */}
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}

export default Tabes
