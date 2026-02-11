from pydantic import BaseModel

class MessageCreate(BaseModel):
    text: str

class MessageResponse(MessageCreate):
    id: int

    class Config:
        from_attributes = True
