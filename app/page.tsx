"use client";
import {
  ArrowUpToLine,
  Badge,
  Bot,
  Calculator,
  Calendar,
  Copy,
  CreditCard,
  Github,
  MessageCircleCode,
  Moon,
  Plus,
  Settings,
  Smile,
  Sparkles,
  Trash,
  User,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Chat = {
  ai: string;
  user: string;
};

export default function Home() {
  // prompt
  const [prompt, setPrompt] = useState("");
  // Chat
  const [chat, setChat] = useState<Chat[]>([]);
  // question
  const [question, setQuestion] = useState<any[]>([]);

  //
  //  Handling when User Click Input Button
  //
  const handleSubmit = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await res.json();
    setChat((it) => [...it, { ai: data.response, user: prompt }]);
    setPrompt("");
  };

  //
  //  Handle Input Height
  //
  const textareaRef = useRef(null);
  useEffect(() => {
    const el = textareaRef.current as any;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [prompt]);

  //
  //  Generate Only One Question
  //
  const handleQuestion = async () => {
    const questionPrompt = `make one question like random question about tech or anything you want, only question like "question" no anything only question. one Question!!`;
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: questionPrompt }),
    });
    const data = await res.json();
    setQuestion((it) => [...it, { question: data.response }]);
  };
  useEffect(() => {
    if (question.length <= 9) {
      handleQuestion();
    } else {
      console.log(question.length);
    }
  });

  //
  //  Handle Select Quest
  //
  function handleSelectedQuestion(target: string) {
    setPrompt(target);
  }

  function handleAddNewChat() {
    setChat([]);
    setQuestion([]);
  }
  // Single Page
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="md:w-9/12 w-full flex">
        {/** Aside */}
        <aside className="w-4/12 h-full z-50 sticky top-0">
          <div className="pt-5">
            <div className="flex gap-2">
              <MessageCircleCode className="text-gray-800" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-800">
                Chatbot
              </h4>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              This is for Educational Purpose
            </p>
          </div>
          <Command className="rounded-lg md:min-w-[450px] pt-12">
            <CommandList>
              <CommandGroup heading="Quick Menu">
                <CommandItem onSelect={() => handleAddNewChat()}>
                  <Plus />
                  <span>New Chat</span>
                </CommandItem>
                <CommandItem>
                  <Moon />
                  <span>Dark Mode</span>
                </CommandItem>
                <CommandItem>
                  <Github />
                  <span>Source Code</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="AI Model">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gen</SelectLabel>
                      <SelectItem value="apple">
                        <Bot />
                        <span>LLama 3.2</span>
                      </SelectItem>
                      <SelectItem value="apple">
                        <Bot />
                        <span>Gemini</span>
                      </SelectItem>
                      <SelectItem value="apple">
                        <Bot />
                        <span>Gemma</span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CommandGroup>
            </CommandList>
          </Command>
          <Command>
            <CommandList>
              <CommandGroup heading="Recommendation from AI">
                {question.map((it, index) => (
                  <CommandItem
                    key={index}
                    value={it.question}
                    onSelect={() => handleSelectedQuestion(it.question)}
                  >
                    <Sparkles />
                    <span>{it.question}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </aside>
        {/** End aside */}
        <div className="w-full z-50 h-full relative">
          <div className="w-full min-h-screen overflow-scroll">
            {chat.map((it, index) => (
              <div className="flex flex-col w-full">
                <Card className="w-full max-w-md self-end mt-12">
                  <CardHeader>
                    <CardTitle>You</CardTitle>
                    <CardDescription>{it.user}</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="w-full max-w-md self-start mt-12 outline-none border-none shadow-none">
                  <CardHeader>
                    <CardTitle>AI</CardTitle>
                    <CardDescription>{it.ai}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Copy />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          {/** Write anything at here */}
          <div className="w-full flex gap-2 p-4 bottom-2 sticky bg-gray-200 rounded-4xl items-center">
            <textarea
              placeholder="Write your imagination..."
              className="max-h-40 w-full resize-none overflow-scroll leading-7 border-none focus:outline-none bg-transparent"
              rows={1}
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <div
              className="bg-black p-2 rounded-4xl cursor-pointer"
              onClick={() => handleSubmit()}
            >
              <ArrowUpToLine className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
