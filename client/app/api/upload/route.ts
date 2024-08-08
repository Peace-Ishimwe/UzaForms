import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to handle raw file uploads
  },
};

// Utility function to generate a random file name
const generateRandomFileName = (originalName: string): string => {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const randomString = crypto.randomBytes(16).toString("hex");
  return `${baseName}_${randomString}${ext}`;
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = generateRandomFileName(file.name);
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ message: "Success", status: 201, filename });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { fileName } = await req.json();

    if (!fileName) {
      return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: "File deleted successfully!" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
};
