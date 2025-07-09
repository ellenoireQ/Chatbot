"use client";
import {
  ArrowUpToLine,
  Bot,
  Cable,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RootState, store } from "./reduxjs/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { changeDarkMode } from "./reduxjs/reducer";
import { Badge } from "@/components/ui/badge";

type Chat = {
  ai: string;
  user: string;
  loading: boolean;
};

export default function Home() {
  // prompt
  const [prompt, setPrompt] = useState("");
  // Chat
  const [chat, setChat] = useState<Chat[]>([]);
  // question
  const [question, setQuestion] = useState<any[]>([]);
  // Loading
  const [loading, setLoading] = useState(false);
  const displayChat = loading ? [...chat, { user: prompt, ai: "" }] : chat;

  const theme = useSelector((e: RootState) => e.counter.darkMode);
  const dispatch = useDispatch();

  //
  //  Handling when User Click Input Button
  //
  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await res.json();
    setChat((it) => [
      ...it,
      { user: prompt, ai: data.response, loading: true },
    ]);
    setPrompt("");
    setLoading(false);
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

  function handleCopyText(e: string) {
    return navigator.clipboard.writeText(e);
  }

  const handleTheme = async () => {
    const disp = dispatch(changeDarkMode());
    console.log(theme);
    return disp;
  };
  // Single Page
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="md:w-9/12 w-full flex">
        {/** Aside */}
        <aside className="w-4/12 h-full z-50 sticky top-0">
          <div className="pt-5">
            <div className="w-full flex">
              <div className="flex gap-1">
                <MessageCircleCode className="text-gray-800" />
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-800">
                  Chatbot
                </h4>
                <Badge variant="destructive" className="bg-blue-500 ml-3">
                  WIP
                </Badge>
              </div>
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
                <CommandItem onSelect={() => handleTheme()}>
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
            <div className="w-full h-screen flex flex-col justify-center items-center">
              <Cable size={120} className="text-gray-800" />
              <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-gray-800">
                http://localhost:11434/api/generate Not Found
              </h1>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pt-4">
                please run
                <span className="bg-blue-100 p-2">ollama run model</span>
              </h3>
            </div>
            {displayChat.map((it, index) => (
              <div className="flex flex-col w-full">
                <Card
                  key={index}
                  className="w-full max-w-md self-end mt-12 duration-300"
                >
                  <CardHeader>
                    <CardTitle>You</CardTitle>
                    <CardDescription>{it.user}</CardDescription>
                  </CardHeader>
                </Card>

                {it.ai ? (
                  <Card className="w-full max-w-md self-start mt-12 outline-none border-none shadow-none">
                    <CardHeader>
                      <CardTitle>AI</CardTitle>
                      <CardDescription>{it.ai}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => handleCopyText(it.ai)}
                          >
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy</p>
                        </TooltipContent>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="w-full max-w-md self-start mt-4 p-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 mt-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                )}
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
