import React from "react";
import { ButtonAdd } from "@/components/button/button-add";
import { ButtonSorted } from "@/components/button/button-sorted";
import { SortTodo } from "@/components/sort-todo";
import { ModalForm } from "@/components/modal/modal-form";

export const SortAndAdd = () => {

  const [isShowSorting, setIsShowSorting] = React.useState(false)

  const [isShowModalForm, setIsShowModalForm] = React.useState(false)

  const handleToggleShowSorting = () => setIsShowSorting(prev => !prev)

  const handleCreateTodo = () => setIsShowModalForm(true)

  const handleCloseModal = () => setIsShowModalForm(false)


  return (
    <>
      <div className='flex items-center gap-5' aria-label='button-wrapper'>
        {/* sort */}
        <ButtonSorted onClick={handleToggleShowSorting} />
        <SortTodo isShow={isShowSorting} onClose={handleToggleShowSorting} />
        {/* add */}
        <ButtonAdd onClick={handleCreateTodo} data-cy='todo-add-button' />
      </div>

      <ModalForm
        isShow={isShowModalForm}
        mode={'create'}
        onClose={handleCloseModal}
      />

    </>

  )
}
