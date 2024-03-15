import os
import getpass
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Pinecone
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
import pinecone

load_dotenv()
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment="gcp-starter")

if __name__ == "__main__":
    print("Hello Vector DB")

    loader = PyPDFLoader(
       "/Users/shivammitter/Desktop/AI/Gen_AI/embeddings/kyc_information.pdf"
    )
    document = loader.load_and_split()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(document)
    embeddings = OpenAIEmbeddings()
    index_name = "testinglangchain"
    docsearch = Pinecone.from_existing_index(index_name, embeddings)
    llm = ChatOpenAI(model = 'gpt-3.5-turbo-1106')
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=docsearch.as_retriever(),

    )

    query = "tell the user the basics about the KYC process and answer related queries"
    result = qa.invoke({'query':query})
    print(result)