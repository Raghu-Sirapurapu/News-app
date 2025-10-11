import React from 'react';

const UserGrid = ({
  users,
  renderLoadingButton,
  handleMakeAdmin,
  handleMakeSuperadmin,
  handleRemoveAdmin,
  handleDeleteUser,
  handleRemoveSuperadmin,
  isLoading,
  isNormalUser // true for the normal users section
}) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
    {users.length > 0 ? (
      users.map((user) => (
        <div
          key={user._id}
          className="bg-white min-w-52 p-5 overflow-x-scroll rounded-xl border border-gray-300 shadow-md transition-all duration-300 cursor-default transform hover:scale-105"
        >
          <p className="text-black  ">
            <span>Email:</span>
            {user.email}
          </p>
          <p className="text-black ">
            <span>Role: </span>
            <span>{user.role}</span>
          </p>
          <p className="text-black ">
            <span>{user?.department}</span>
          </p>
          <div className="mt-4 flex flex-row gap-2 ">
            {isNormalUser && (
              <> 
                {renderLoadingButton({
                  id: user._id,
                  keyPrefix: 'makeadmin',
                  onClick: () => handleMakeAdmin(user._id),
                  children: 'Make Admin',
                  className:
                    'flex-shrink-0 bg-gray-600 text-white px-3 py-1 rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300'
                })}
                {renderLoadingButton({
                  id: user._id,
                  keyPrefix: 'makesuperadmin',
                  onClick: () => handleMakeSuperadmin(user._id),
                  children: 'Make Superadmin',
                  className:
                    'flex-shrink-0 bg-gray-600  text-white px-3 py-1 rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300'
                })}
              </>
            )}
            {user.role === 'admin' && (
              <>
                {renderLoadingButton({
                  id: user._id,
                  keyPrefix: 'removeadmin',
                  onClick: () => handleRemoveAdmin(user._id),
                  children: 'Remove Admin',
                  className:
                    'flex-shrink-0 bg-gray-600 text-white px-2 py-1 rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300'
                })}
                {renderLoadingButton({
                  id: user._id,
                  keyPrefix: 'makesuperadmin',
                  onClick: () => handleMakeSuperadmin(user._id),
                  children: 'Make Superadmin',
                  className:
                    'flex-shrink-0 bg-gray-600 text-white px-2 py-1 rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300'
                })}
              </>
            )}
            {user.role === 'superadmin' && (
              renderLoadingButton({
                id: user._id,
                keyPrefix: 'removesuperadmin',
                className:
                  'flex-shrink-0 bg-red-500 text-white px-3 py-1 rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300',
                onClick: () => handleRemoveSuperadmin(user._id),
                children: 'Remove Superadmin'
              })
            )}

            {renderLoadingButton({
              id: user._id,
              keyPrefix: 'delete-user',
              onClick: () => handleDeleteUser(user._id),
              children: 'Delete',
              className:
                'flex-shrink-0 bg-red-600 border border-[#E0E0E0] text-white px-3 py-1  rounded font-semibold cursor-pointer hover:brightness-120 transition-colors duration-300'
            })}
            {/* To add a space after delete button */}
            <div className="flex-shrink-0 w-4"></div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-black text-center col-span-full">No users found.</p>
    )}
  </div>
);

export default UserGrid;
