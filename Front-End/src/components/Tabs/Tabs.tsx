import { useContext } from 'react'
import { Flex, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { Task } from '../TaskBar/ClassTask.js'
import { Tab } from './classTab.js'
import AddTabDialog from '../popover/AddTabDialog.js';
import DeleteTabDialog from '../popover/DeleteTabDialog.js';
import EditTabDialog from '../popover/EditTabDialog.js';
import Item from '../Item/item';
import { TaskContext } from '../../context/TaskContext.js';
import { TabContext } from '../../context/TabContext.js';

const Tabes = () => {
  const { allTasks: tarefas } = useContext(TaskContext);
  const { tabs, setSelectedTab, selectedTab } = useContext(TabContext);

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      w={{ base: "200px", sm: "400px", md: "700px", lg: "900px" }}
      onValueChange={(e: any) => {
        setSelectedTab(e.value);
      }}
    >
      <Tabs.List
        bg='#343E48'
        borderRadius={'full'}
        flex="1 1 auto"
        overflowX={"scroll"}
        mt={"10px"}
        py='2px'
      >
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Trigger
            value={tab.id.toString()}
            borderRadius='full'
            key={tab.id}
            minW="content"
            textWrap='nowrap'
            mx="4px"
            color={selectedTab == tab.id.toString() ? '#343E48' : '#B5BDC8'}
            bg={selectedTab == tab.id.toString() ? '#B5BDC8' : '#343E48'}
          >
            {tab.name + " "}
            {selectedTab === tab.id.toString() ? <>
              <EditTabDialog tabe={tab} />
              <DeleteTabDialog tabToRemove={tab} />
            </> : <></>}
          </Tabs.Trigger>
        ))}
        <AddTabDialog />
      </Tabs.List>

      <Tabs.ContentGroup>
        <Tabs.Content value={selectedTab}>
          {tabs?.length > 0 && (
            <>
              <Heading
                size="xl"
                my="6"
              >
                {tabs.find((t) => t.id.toString() === selectedTab)?.description}
              </Heading>
              <Flex direction={"column"}>
                {tarefas?.filter(task => task.tab_task.toString() === selectedTab).length > 0 ? (
                  <List.Root>
                    {tarefas
                      .filter(task => task.tab_task.toString() === selectedTab)
                      .map((task: Task) => (

                        <List.Item
                          key={task.id}
                          listStyle='none'
                          m='9px'
                        >
                          <Item
                            task={task}
                          />
                        </List.Item>

                      ))}
                  </List.Root>
                ) : (
                  <Text className="no-tasks">Nenhuma tarefa adicionada ainda.</Text>
                )}
              </Flex>
            </>
          )}
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
export default Tabes