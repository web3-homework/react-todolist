import React, { useState, useEffect, useMemo } from 'react'
import { Button, Space, Form, Input, Checkbox } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

// 使用 React.memo 包装组件，避免不必要的渲染
const AddTodo = React.memo(({ form, onFinish, cancelFn }) => {
    const todoFooterStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
    }
    return (
        <div>
            <h2>New Todo</h2>
            <Form
                layout="horizontal"
                labelCol={{ span: 2 }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <div style={todoFooterStyle}>
                    <Form.Item>
                        <Space>
                            <Button type="default" onClick={cancelFn}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </Space>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
})

export default function TodoList() {
    const [filter, setFilter] = useState('all')
    const [list, setList] = useState([
      {
        id: Date.now(),
        title: 'Learn React',
        completed: false
      }
    ])
    const [show, setShow] = useState(false)
    const [editIndex, setEditIndex] = useState(-1)
    const [form] = Form.useForm()

    useEffect(() => {
        const storedList = localStorage.getItem('list')
        if (storedList) {
            setList(JSON.parse(storedList))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    // 使用 useMemo 缓存过滤结果，避免每次渲染都进行计算
    const filterList = useMemo(() => {
        return list.filter(item => {
            if (filter === 'completed') {
                return item.completed
            } else if (filter === 'unfinished') {
                return !item.completed
            }
            return true
        })
    }, [filter, list])

    const onFinish = (values) => {
        if (editIndex !== -1) { // 编辑
            let newList = [...list]
            newList[editIndex] = {
                ...values,
                completed: newList[editIndex].completed
            }
            setList(newList)
        } else {
            setList([...list, {
                ...values,
                completed: false,
                // 添加唯一标识
                id: Date.now()
            }])
        }
        form.resetFields()
        setShow(false)
        setEditIndex(-1)
    };

    const cancelFn = () => {
        form.resetFields()
        setShow(false)
    }

    const changeState = (index) => {
        let newList = [...list]
        let state = newList[index].completed
        newList[index].completed = !state
        setList(newList)
    }

    const editFn = (index) => {
        setShow(true)
        setEditIndex(index)
        form.setFieldsValue(list[index])
    }

    const deleteFn = (index) => {
        let newList = [...list]
        newList.splice(index, 1)
        setList(newList)
    }

    const containerStyle = {
        width: '600px',
        margin: '20px auto',
        padding: '20px',
    }
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    }
    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <Space>
                    <Button type={filter === 'all' ? "primary" : "default"} onClick={() => setFilter('all')}>All</Button>
                    <Button type={filter === 'unfinished' ? "primary" : "default"} onClick={() => setFilter('unfinished')}>Unfinished</Button>
                    <Button type={filter === 'completed' ? "primary" : "default"} onClick={() => setFilter('completed')}>Completed</Button>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setShow(!show)}>Add</Button>
            </div>
            <div>
                {filterList.map((item) => {
                    return (
                        <div key={item.id} style={itemStyle}>
                            <Space>
                                <Checkbox checked={item.completed} onChange={() => changeState(filterList.indexOf(item))} /> <span style={item.completed ? { textDecoration: 'line-through' } : {}}>{item.title}</span>
                            </Space>
                            <Space>
                                <Button shape="circle" icon={<EditOutlined />} onClick={() => editFn(filterList.indexOf(item))} /> 
                                <Button shape="circle" icon={<DeleteOutlined />} onClick={() => deleteFn(filterList.indexOf(item))} /> 
                            </Space>
                        </div>
                    )
                })}
            </div>
            {show && <AddTodo form={form} onFinish={onFinish} cancelFn={cancelFn} />}
        </div>
    )
}
 