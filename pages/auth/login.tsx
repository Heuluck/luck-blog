import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, Checkbox, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const handleSubmit = async (value: { userName: string; passWord: string }) => {
        const result = await signIn("credentials", {
            username: value.userName,
            password: value.passWord,
            callbackUrl: "/protected",
            redirect:false
        });

        // if (result) {
        console.log(result);
        // }
    };

    return (
        <>
            <Form name="basic" onFinish={handleSubmit} autoComplete="off">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
