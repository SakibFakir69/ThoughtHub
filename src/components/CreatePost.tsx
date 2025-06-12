import React from "react";

export default function CreatePost() {
  return (
    <div>
      <section>
        <div>
          <h2>Create New Post</h2>
          <p>Share your insights and stories with the world.</p>
        </div>

        <div>
          <div>
            <span>Title</span>
            <input className="border w-80" />
          </div>

          <div>
            <span>Catgorey</span>
            <input className="border w-80" />
          </div>

          <div>
            <span>Featured Image</span>
      
          </div>

          <div>
            <span>Description</span>
            <textarea className="border h-40"></textarea>
          </div>

          <div>
               <span>Tags</span>
            <input className="border w-80" />
          </div>


        </div>
        <section>
            <button className="btn">Publish</button>
            <button className="btn">Cancel</button>
        </section>
      </section>
    </div>
  );
}
